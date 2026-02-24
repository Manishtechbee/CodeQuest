import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Home, AlertCircle } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar />
      
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <Button variant="gradient" onClick={() => navigate('/')}>
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
