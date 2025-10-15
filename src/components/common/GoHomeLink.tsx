import Link from 'next/link';

export function GoHomeLink() {
  return (
    <Link
      href="/"
      className="inline-block mt-6 text-blue-600 hover:text-blue-800 underline"
    >
      Go back to home page
    </Link>
  );
}
