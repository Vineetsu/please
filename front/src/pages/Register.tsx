import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"provider" | "charity">("provider");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // For demo purposes, we're just simulating a successful registration
      await register({
        name,
        email,
        password,
        organization,
        phone,
        address,
        role
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      // Navigate to login after registration
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem with your registration",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Join the Food Rescue Network and start making a difference
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="provider" className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="provider" onClick={() => setRole("provider")}>
                Food Provider
              </TabsTrigger>
              <TabsTrigger value="charity" onClick={() => setRole("charity")}>
                Charity/Shelter
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="provider">
              <CardContent className="space-y-4 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="organization">Restaurant/Store Name</Label>
                    <Input 
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Your business name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="name">Contact Person</Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City, State"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="charity">
              <CardContent className="space-y-4 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="organization">Charity/Shelter Name</Label>
                    <Input 
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Your organization name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="name">Contact Person</Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City, State"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center pt-2 pb-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
