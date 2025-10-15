import { serviceProviders } from '@/components/oauth';
import { ResultCard } from '@/components/common/ResultCard';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

interface CallbackPageProps {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{ code?: string }>;
}

export default async function CallbackPage({
  params,
  searchParams,
}: CallbackPageProps) {
  const { provider } = await params;
  const { code } = await searchParams;

  // Get the provider instance
  const providerInstance = serviceProviders[provider];

  if (!providerInstance) {
    console.error(`Provider not found: ${provider}`);
    return (
      <ResultCard
        title="Error"
        message="Provider not found"
        type="error"
        icon={
          <QuestionMarkCircleIcon className="w-16 h-16 mx-auto text-red-500" />
        }
      />
    );
  }

  if (!code) {
    console.error('Missing code in query parameters');
    return (
      <ResultCard
        title="Error"
        message="Missing authorization code"
        type="error"
        icon={
          <ExclamationCircleIcon className="w-16 h-16 mx-auto text-red-500" />
        }
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
          className="bg-gradient-to-br from-red-50 to-orange-50"
          icon={
            <ExclamationCircleIcon className="w-16 h-16 mx-auto text-red-500" />
          }
        />
      );
    }

    // Success case
    return (
      <ResultCard
        title="Success"
        message="You can close this page now"
        type="success"
        className="bg-gradient-to-br from-green-50 to-blue-50"
        icon={<CheckBadgeIcon className="w-16 h-16 mx-auto text-green-500" />}
      />
    );
  } catch (error) {
    console.error('Failed to get tokens:');
    console.error(error);

    return (
      <ResultCard
        title="Error"
        message="Failed to obtain tokens"
        type="error"
        className="bg-gradient-to-br from-red-50 to-orange-50"
        icon={
          <ExclamationCircleIcon className="w-16 h-16 mx-auto text-red-500" />
        }
      />
    );
  }
}
