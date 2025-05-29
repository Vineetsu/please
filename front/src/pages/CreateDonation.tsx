import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useDonations } from '@/contexts/DonationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { FoodCategory, DonationStatus } from '@/lib/types';

const CreateDonation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createDonation } = useDonations();
  const { user } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    category: '',
    pickupDetails: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a donation.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create expiration date from the form input
      const expiryDate = new Date(formData.expiryDate);
      
      // Create donation object
      const newDonation = {
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        expiration: expiryDate,
        category: formData.category as FoodCategory,
        pickupWindow: {
          start: new Date(),
          end: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        },
        address: user.address,
        providerId: user.id,
        providerName: user.organization,
        status: 'available' as DonationStatus,
      };
      
      // Submit the donation
      const success = await createDonation(newDonation);
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your donation has been created and is now available.",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Failed to create donation");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your donation.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Create New Donation</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
              <CardDescription>
                Please provide information about the food items you'd like to donate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Leftover Bread and Pastries" 
                  value={formData.title}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the food items, quantity, and any other relevant details" 
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="text" 
                    placeholder="Number of items/servings" 
                    value={formData.quantity}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry/Best Before</Label>
                  <Input 
                    id="expiryDate" 
                    type="date" 
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleSelectChange} value={formData.category}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produce">Fresh Produce</SelectItem>
                    <SelectItem value="bakery">Bread & Bakery</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat & Protein</SelectItem>
                    <SelectItem value="prepared">Prepared Meals</SelectItem>
                    <SelectItem value="canned">Canned Goods</SelectItem>
                    <SelectItem value="dry goods">Dry Goods</SelectItem>
                    <SelectItem value="frozen">Frozen Foods</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupDetails">Pickup Details</Label>
                <Textarea 
                  id="pickupDetails" 
                  placeholder="Specify available pickup times and any special instructions" 
                  className="min-h-[100px]"
                  value={formData.pickupDetails}
                  onChange={handleChange}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Donation"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateDonation;
