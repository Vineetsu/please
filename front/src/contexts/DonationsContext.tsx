import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donation, DonationStatus } from '@/lib/types';
import { mockDonations } from '@/lib/mockData';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DonationsContextType {
  donations: Donation[];
  isLoading: boolean;
  refreshDonations: () => void;
  createDonation: (donationData: Partial<Donation>) => Promise<boolean>;
  updateDonation: (id: string, updates: Partial<Donation>) => Promise<boolean>;
  claimDonation: (donationId: string) => Promise<boolean>;
  getUserDonations: () => Donation[];
  getDonationById: (id: string) => Donation | undefined;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDonations = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, use mock data
    setDonations(mockDonations);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const refreshDonations = () => {
    fetchDonations();
  };

  const createDonation = async (donationData: Partial<Donation>) => {
    if (!user) return false;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDonation: Donation = {
      id: `donation${Date.now()}`,
      providerId: user.id,
      providerName: user.organization,
      title: donationData.title || '',
      description: donationData.description || '',
      category: donationData.category || 'other',
      quantity: donationData.quantity || '',
      expiration: donationData.expiration || new Date(),
      pickupWindow: donationData.pickupWindow || {
        start: new Date(),
        end: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      status: 'available',
      createdAt: new Date(),
      address: user.address,
      coordinates: donationData.coordinates || { lat: 0, lng: 0 },
      images: donationData.images || [],
    };
    
    // Add to local state
    setDonations(prev => [newDonation, ...prev]);
    
    toast({
      title: "Donation created",
      description: "Your donation has been listed successfully.",
    });
    
    return true;
  };

  const updateDonation = async (id: string, updates: Partial<Donation>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setDonations(prev => 
      prev.map(donation => 
        donation.id === id ? { ...donation, ...updates } : donation
      )
    );
    
    return true;
  };

  const claimDonation = async (donationId: string) => {
    if (!user) return false;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const donation = donations.find(d => d.id === donationId);
    
    if (!donation || donation.status !== 'available') {
      toast({
        title: "Unable to claim donation",
        description: "This donation is no longer available.",
        variant: "destructive"
      });
      return false;
    }
    
    const updates: Partial<Donation> = {
      status: 'scheduled',
      claimedBy: {
        id: user.id,
        name: user.organization,
        contactPerson: user.name,
        phone: user.phone
      },
      scheduledPickup: new Date(Date.now() + 2 * 60 * 60 * 1000), // Default to 2 hours from now
    };
    
    setDonations(prev => 
      prev.map(donation => 
        donation.id === donationId ? { ...donation, ...updates } : donation
      )
    );
    
    toast({
      title: "Donation claimed!",
      description: "You have successfully claimed this donation.",
    });
    
    return true;
  };

  const getUserDonations = () => {
    if (!user) return [];
    
    if (user.role === 'provider') {
      return donations.filter(d => d.providerId === user.id);
    } else if (user.role === 'charity') {
      return donations.filter(d => d.claimedBy?.id === user.id);
    }
    
    // Admin sees all donations
    return donations;
  };

  const getDonationById = (id: string) => {
    return donations.find(d => d.id === id);
  };

  return (
    <DonationsContext.Provider value={{ 
      donations, 
      isLoading, 
      refreshDonations,
      createDonation,
      updateDonation,
      claimDonation,
      getUserDonations,
      getDonationById
    }}>
      {children}
    </DonationsContext.Provider>
  );
}

export const useDonations = () => {
  const context = useContext(DonationsContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationsProvider');
  }
  return context;
};
