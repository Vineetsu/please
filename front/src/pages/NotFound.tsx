import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-4 text-xl text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="mt-8 inline-block">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
