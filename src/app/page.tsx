import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-4xl mb-2">
            🐻‍❄️🔑 Oh auth, bear!
          </h2>
          <p className="text-center mb-4">OAuth authentication service</p>

          <div className="divider">Available Providers</div>

          <div className="card-actions justify-center">
            <Link
              href={`/oauth/raindrop?state=${encodeURIComponent(
                JSON.stringify({
                  extensionId: 'gkcgbmlbjcdmnifhcmfgkafekaohjcof',
                }),
              )}`}
              className="btn btn-info w-full"
            >
              💧 Raindrop
            </Link>

            <Link href={`/oauth/google`} className="btn btn-primary w-full">
              🅖 Google
            </Link>

            <Link href={`/oauth/github`} className="btn btn-accent w-full">
              🐱 GitHub
            </Link>

            <Link
              href={`/oauth/not-found-test`}
              className="btn btn-error w-full"
            >
              😕 Not Found Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
