import { PlaceholderImage } from '@/components/common/PlaceholderImage';
import { ResultCard } from '@/components/common/ResultCard';
import { SendTokensToExtension } from '@/components/common/SendTokensToExtension';
import { serviceProviders } from '@/components/oauth';
import { sendMessageToExtension } from '@/utils/extensions/messaging';
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raindrop OAuth',
  icons: {
    icon: {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>💧</text></svg>",
      type: 'image/svg+xml',
    },
  },
};

interface CallbackPageProps {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{ code?: string; state?: string }>;
}

export default async function CallbackPage({
  params,
  searchParams,
}: CallbackPageProps) {
  const { provider } = await params;
  const { code, state } = await searchParams;

  // Get the provider instance
  const providerInstance = serviceProviders[provider];

  // Check if the provider instance is available
  if (!providerInstance) {
    console.error(`Provider not found: ${provider}`);
    return (
      <ResultCard
        title="Error"
        message="Provider not found"
        type="error"
        icon={<PlaceholderImage type="question" />}
        showHomeLink
      />
    );
  }

  // Check if the code is available
  if (!code) {
    console.error('Missing code in query parameters');
    return (
      <ResultCard
        title="Error"
        message="Missing authorization code"
        type="error"
        icon={<PlaceholderImage type="raindrop-error" />}
        showHomeLink
      />
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await providerInstance.getTokens(code);

    // Log the result to console
    console.log('OAuth token exchange response:');
    console.log(JSON.stringify(tokens, null, 2));

    // Check if the response contains an error
    const hasError =
      ('result' in tokens && tokens.result === false) ||
      ('errorMessage' in tokens && tokens.errorMessage) ||
      ('error' in tokens && tokens.error);

    if (hasError) {
      const errorMessage =
        (tokens as any).errorMessage ||
        (tokens as any).error ||
        'Authentication failed';

      console.error('OAuth provider returned error:', errorMessage);

      return (
        <ResultCard
          title="Authentication Failed"
          message={errorMessage}
          type="error"
          icon={<PlaceholderImage type="raindrop-error" />}
        />
      );
    }

    // check if extension id is in state
    let extensionId: string | undefined;
    try {
      if (state) {
        const stateData = JSON.parse(state);
        extensionId = stateData.extensionId;
      }
    } catch (error) {
      console.error('Failed to parse state data:', error, state);
    }

    // Success case
    return (
      <>
        <ResultCard
          title="Success"
          message="You can close this page now"
          type="success"
          icon={<PlaceholderImage type="raindrop-success" />}
        />
        <SendTokensToExtension
          provider={provider}
          tokens={tokens}
          extensionId={extensionId}
        />
      </>
    );
  } catch (error) {
    console.error('Failed to get tokens:');
    console.error(error);

    return (
      <ResultCard
        title="Error"
        message="Failed to obtain tokens"
        type="error"
        icon={<PlaceholderImage type="raindrop-error" />}
      />
    );
  }
}
