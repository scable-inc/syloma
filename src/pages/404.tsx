import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      id="notfound-container"
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div id="notfound-content" className="text-center">
        <h1
          data-editable
          data-name="notfound.error.code"
          className="text-4xl font-bold mb-4"
        >
          404
        </h1>
        <p
          data-editable
          data-name="notfound.error.title"
          className="text-xl text-gray-600 mb-4"
        >
          Oops! Page not found
        </p>
        <p
          data-editable
          data-name="notfound.error.message"
          className="text-gray-500 mb-6"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          data-editable
          data-name="notfound.return.text"
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
