import Link from 'next/link';

export function GoHomeLink() {
  return (
    <Link href="/">
      <button className="btn btn-soft">🏠 Home</button>
    </Link>
  );
}
