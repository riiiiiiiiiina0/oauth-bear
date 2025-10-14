import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Auth Bear</h1>
      <ul>
        <li>
          <Link href="/oauth/raindrop">- Raindrop</Link>
        </li>
      </ul>
    </>
  );
}
