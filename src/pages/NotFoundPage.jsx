import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-8">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline text-lg">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;