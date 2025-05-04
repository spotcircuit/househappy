'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
