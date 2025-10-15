import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="prose p-4">
      <h1>🐻‍❄️🔑 Auth Bear</h1>
      <ul>
        <li>
          <Link
            href={`/oauth/raindrop?state=${encodeURIComponent(
              JSON.stringify({ extensionId: '123' }),
            )}`}
          >
            💧 Raindrop
          </Link>
        </li>
      </ul>
    </div>
  );
}
