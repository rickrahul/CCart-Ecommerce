import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
      >
        <Home size={20} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;