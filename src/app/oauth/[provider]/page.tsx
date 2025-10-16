import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { PlaceholderImage } from '@/components/common/PlaceholderImage';
import { ResultCard } from '@/components/common/ResultCard';
import { serviceProviders } from '@/components/oauth';

export const metadata: Metadata = {
  title: 'Raindrop',
  icons: {
    icon: {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>💧</text></svg>",
      type: 'image/svg+xml',
    },
  },
};

export default async function OAuthPage({
  params,
  searchParams,
}: {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { provider } = await params;
  const providerInstance = serviceProviders[provider];

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

  const authorizationUrl = await providerInstance.getAuthorizationUrl(
    await searchParams,
  );
  return redirect(authorizationUrl);
}
