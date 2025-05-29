import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePreferences = () => {
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
        title: "Preferences updated",
        description: "Your preferences have been saved successfully.",
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
  
  // Only charities should see this page
  if (user.role !== 'charity') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-lg">This page is only available for charity organizations</p>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Donation Preferences</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Food Preferences</CardTitle>
              <CardDescription>
                Set your preferences for donations you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Food Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bread" defaultChecked />
                    <Label htmlFor="bread">Bread & Bakery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="produce" defaultChecked />
                    <Label htmlFor="produce">Fresh Produce</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dairy" defaultChecked />
                    <Label htmlFor="dairy">Dairy Products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="meat" />
                    <Label htmlFor="meat">Meat & Fish</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="prepared" defaultChecked />
                    <Label htmlFor="prepared">Prepared Meals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="canned" defaultChecked />
                    <Label htmlFor="canned">Canned Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dry" defaultChecked />
                    <Label htmlFor="dry">Dry Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pickup & Delivery</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pickup">Available for pickup</Label>
                    <Switch id="pickup" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="delivery">Need delivery service</Label>
                    <Switch id="delivery" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS notifications</Label>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-donations">Alert for new matching donations</Label>
                    <Switch id="new-donations" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePreferences;
