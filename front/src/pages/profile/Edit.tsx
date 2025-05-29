import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ProfileEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      navigate("/dashboard");
    }, 1000);
  };
  
  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-lg">Please log in to access this page</p>
          <Button className="mt-4" onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" defaultValue={user.organization} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue={user.address} className="min-h-[100px]" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
