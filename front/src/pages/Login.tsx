import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have been logged in",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Demo credentials
  const demoCredentials = {
    admin: { email: 'admin@foodrescue.org', password: 'admin123' },
    restaurant: { email: 'info@freshharvest.com', password: 'rest123' },
    charity: { email: 'help@hopeshelter.org', password: 'charity123' }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to continue to Food Rescue Network
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>
            
            <div className="mt-6 grid gap-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Admin Demo Login</h3>
                <p className="text-sm mb-1">Email: {demoCredentials.admin.email}</p>
                <p className="text-sm mb-3">Password: {demoCredentials.admin.password}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEmail(demoCredentials.admin.email);
                    setPassword(demoCredentials.admin.password);
                  }}
                >
                  Sign in as Admin
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Restaurant Demo Login</h3>
                <p className="text-sm mb-1">Email: {demoCredentials.restaurant.email}</p>
                <p className="text-sm mb-3">Password: {demoCredentials.restaurant.password}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEmail(demoCredentials.restaurant.email);
                    setPassword(demoCredentials.restaurant.password);
                  }}
                >
                  Sign in as Restaurant
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Charity Demo Login</h3>
                <p className="text-sm mb-1">Email: {demoCredentials.charity.email}</p>
                <p className="text-sm mb-3">Password: {demoCredentials.charity.password}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEmail(demoCredentials.charity.email);
                    setPassword(demoCredentials.charity.password);
                  }}
                >
                  Sign in as Charity
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
