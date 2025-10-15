import { redirect } from 'next/navigation';
import Link from 'next/link';

import { serviceProviders } from '@/components/oauth';

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p>Provider not found: {provider}</p>
          </div>
          <Link
            href="/"
            className="inline-block mt-6 text-blue-600 hover:text-blue-800 underline"
          >
            Go back to home page
          </Link>
        </div>
      </div>
    );
  }

  const authorizationUrl = await providerInstance.getAuthorizationUrl(
    await searchParams,
  );
  return redirect(authorizationUrl);
}
