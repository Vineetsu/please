import { Link } from 'react-router-dom';
import { Donation } from '@/lib/types';
import { formatDate, formatTimeWindow, getStatusColor, getCategoryIcon } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DonationCardProps {
  donation: Donation;
  showActions?: boolean;
}

export const DonationCard = ({ donation, showActions = true }: DonationCardProps) => {
  return (
    <div className="donation-card border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      {donation.images && donation.images.length > 0 && (
        <div className="mb-4 -mt-5 -mx-5 rounded-t-lg overflow-hidden h-48">
          <img 
            src={donation.images[0]} 
            alt={donation.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <span className="mr-2">{getCategoryIcon(donation.category)}</span>
            {donation.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{donation.providerName}</p>
        </div>
        <Badge className={`status-badge ${getStatusColor(donation.status)}`}>
          {donation.status}
        </Badge>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="line-clamp-2">{donation.description}</p>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Quantity:</span>
          <span className="font-medium text-gray-700">{donation.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Expires:</span>
          <span className="font-medium text-gray-700">{formatDate(donation.expiration)}</span>
        </div>
        <div className="flex justify-between">
          <span>Pickup Window:</span>
          <span className="font-medium text-gray-700">
            {formatTimeWindow(donation.pickupWindow.start, donation.pickupWindow.end)}
          </span>
        </div>
      </div>
      
      {showActions && (
        <div className="mt-5 flex">
          <Link to={`/donations/${donation.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
