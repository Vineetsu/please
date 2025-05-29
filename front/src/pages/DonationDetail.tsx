import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDonations } from "@/contexts/DonationsContext";
import { formatDate, formatTimeWindow, getStatusColor, getCategoryIcon } from "@/lib/utils";
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { donations, isLoading, claimDonation } = useDonations();
  const { user } = useAuth();
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(false);

  const donation = donations.find(d => d.id === id);

  const handleClaimDonation = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to claim donations",
        variant: "destructive"
      });
      return;
    }

    setClaiming(true);
    try {
      const success = await claimDonation(id!);
      if (success) {
        toast({
          title: "Donation claimed",
          description: "You have successfully claimed this donation."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setClaiming(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-64 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </div>
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!donation) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-5xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Donation Not Found</h1>
          <p className="text-gray-600 mb-8">
            The donation you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/donations">
            <Button>Browse Available Donations</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/donations" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Donations
          </Link>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{donation.title}</h1>
            <Badge className={`${getStatusColor(donation.status)}`}>
              {donation.status}
            </Badge>
          </div>
          <p className="text-gray-600">{donation.providerName}</p>
        </div>

        {donation.images && donation.images.length > 0 && (
          <Card className="mb-8 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={donation.images[0]} 
                alt={donation.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{donation.description}</p>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Category</h3>
              <div className="flex items-center">
                <span className="mr-2">{getCategoryIcon(donation.category)}</span>
                <span className="capitalize">{donation.category}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
              <p>{donation.quantity}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Pickup Information</h2>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900">Location</h3>
              </div>
              <p className="text-gray-700">{donation.address}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900">Expiration</h3>
              </div>
              <p className="text-gray-700">{formatDate(donation.expiration)}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900">Pickup Window</h3>
              </div>
              <p className="text-gray-700">
                {formatTimeWindow(donation.pickupWindow.start, donation.pickupWindow.end)}
              </p>
            </div>
          </div>
        </div>
        
        {donation.status === "available" && (
          <div className="border-t border-gray-200 pt-6">
            <Button 
              className="w-full md:w-auto" 
              size="lg"
              onClick={handleClaimDonation}
              disabled={claiming || !user}
            >
              {claiming ? "Processing..." : "Claim This Donation"}
            </Button>
            {!user && (
              <p className="mt-2 text-sm text-gray-500">
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link> to claim this donation
              </p>
            )}
          </div>
        )}
        
        {donation.status !== "available" && (
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900">This donation is no longer available</h3>
              <p className="text-gray-600 mt-1">
                It has already been {donation.status === "delivered" ? "distributed" : donation.status}
              </p>
              <Link to="/donations" className="inline-block mt-3">
                <Button variant="outline">Browse Available Donations</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DonationDetail;
