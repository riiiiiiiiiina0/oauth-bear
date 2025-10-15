import Link from 'next/link';
import { serviceProviders } from '@/components/oauth';

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

  if (!code) {
    console.error('Missing code in query parameters');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p>Missing authorization code</p>
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Authentication Failed
              </h1>
              <p className="text-gray-700 mb-2">{errorMessage}</p>
              {(tokens as any).status && (
                <p className="text-sm text-gray-500">
                  Status: {(tokens as any).status}
                </p>
              )}
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

    // Success case
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Success!</h1>
            <p className="text-gray-600">You can close this page now</p>
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
  } catch (error) {
    console.error('Failed to get tokens:');
    console.error(error);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700 mb-2">Failed to obtain tokens</p>
            <p className="text-sm text-gray-500">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
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
}
