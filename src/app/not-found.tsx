import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display">Page not found</h1>
      <p className="max-w-md text-[15px]">That page doesn&rsquo;t exist or has moved. Try the homepage or browse everything.</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/" className="btn">
          Back to home
        </Link>
        <Link href="/collections/all" className="btn-outline">
          Shop all products
        </Link>
      </div>
    </div>
  );
}
