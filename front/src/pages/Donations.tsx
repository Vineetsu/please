
import { Layout } from '@/components/layout/Layout';
import { DonationsList } from '@/components/donations/DonationsList';
import { useDonations } from '@/contexts/DonationsContext';

const Donations = () => {
  const { donations, isLoading } = useDonations();
  
  // Filter to show only available donations
  const availableDonations = donations.filter(d => d.status === 'available');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Donations</h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse and claim available food donations in your area.
          </p>
        </div>
        
        <DonationsList donations={availableDonations} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Donations;
