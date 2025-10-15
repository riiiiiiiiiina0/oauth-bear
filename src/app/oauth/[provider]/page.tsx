import { redirect } from 'next/navigation';
import Link from 'next/link';

import { serviceProviders } from '@/components/oauth';
import { ResultCard } from '@/components/common/ResultCard';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

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
        icon={
          <QuestionMarkCircleIcon className="w-16 h-16 mx-auto text-red-500" />
        }
      />
    );
  }

  const authorizationUrl = await providerInstance.getAuthorizationUrl(
    await searchParams,
  );
  return redirect(authorizationUrl);
}
