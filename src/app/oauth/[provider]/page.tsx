import { redirect } from 'next/navigation';

import { serviceProviders } from '@/components/oauth';

export default async function OAuthPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  const providerInstance = serviceProviders[provider];

  if (!providerInstance) {
    return <div>Provider not found</div>;
  }

  const authorizationUrl = await providerInstance.getAuthorizationUrl();
  return redirect(authorizationUrl);
}
