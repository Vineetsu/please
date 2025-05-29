import { useState } from 'react';
import { DonationCard } from './DonationCard';
import { Donation, FoodCategory } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DonationsListProps {
  donations: Donation[];
  isLoading?: boolean;
}

export const DonationsList = ({ donations, isLoading = false }: DonationsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<FoodCategory[]>([]);
  
  const categories: FoodCategory[] = ['produce', 'bakery', 'dairy', 'meat', 'prepared', 'canned', 'dry goods', 'frozen', 'beverages', 'other'];
  
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.providerName.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(donation.category);
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleCategory = (category: FoodCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 mb-4 rounded-full bg-gray-200"></div>
          <div className="h-4 w-48 mb-2 rounded bg-gray-200"></div>
          <div className="h-3 w-36 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for donations..."
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
              {selectedCategories.length > 0 && (
                <span className="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
                  {selectedCategories.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Food Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {filteredDonations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😕</div>
          <h3 className="text-lg font-medium text-gray-900">No donations found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};
