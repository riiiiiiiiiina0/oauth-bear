import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐻‍❄️🔑 Auth Bear
          </h1>
          <p className="text-gray-600">OAuth authentication service</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Available Providers
          </h2>
          <Link
            href={`/oauth/raindrop?state=${encodeURIComponent(
              JSON.stringify({
                extensionId: 'gkcgbmlbjcdmnifhcmfgkafekaohjcof',
              }),
            )}`}
            className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
          >
            💧 Raindrop
          </Link>
        </div>
      </div>
    </div>
  );
}
