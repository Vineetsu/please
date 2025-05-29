import { Donation, User, CharityPreference } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'provider1',
    name: 'Fresh Harvest Restaurant',
    email: 'info@freshharvest.com',
    role: 'provider',
    organization: 'Fresh Harvest LLC',
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567'
  },
  {
    id: 'provider2',
    name: 'Green Grocers Market',
    email: 'contact@greengroc.com',
    role: 'provider',
    organization: 'Green Grocers Inc',
    address: '456 Oak Ave, Anytown, USA',
    phone: '(555) 987-6543'
  },
  {
    id: 'charity1',
    name: 'Hope Community Shelter',
    email: 'help@hopeshelter.org',
    role: 'charity',
    organization: 'Hope Foundation',
    address: '789 Pine Rd, Anytown, USA',
    phone: '(555) 456-7890'
  },
  {
    id: 'charity2',
    name: 'Sunshine Food Bank',
    email: 'info@sunshinefoodbank.org',
    role: 'charity',
    organization: 'Sunshine Charity',
    address: '101 Maple Dr, Anytown, USA',
    phone: '(555) 567-8901'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@foodrescue.org',
    role: 'admin',
    organization: 'Food Rescue Network',
    address: '202 Admin Plaza, Anytown, USA',
    phone: '(555) 234-5678'
  }
];

// Mock Donations
export const mockDonations: Donation[] = [
  {
    id: 'donation1',
    providerId: 'provider1',
    providerName: 'Fresh Harvest Restaurant',
    title: 'Leftover Bread and Pastries',
    description: 'Assorted breads, bagels, and pastries. All fresh from today.',
    category: 'bakery',
    quantity: '15 lbs (approx. 30 items)',
    expiration: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    pickupWindow: {
      start: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      end: new Date(Date.now() + 5 * 60 * 60 * 1000) // 5 hours from now
    },
    status: 'available',
    createdAt: new Date(),
    address: '123 Main St, Anytown, USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation2',
    providerId: 'provider2',
    providerName: 'Green Grocers Market',
    title: 'Mixed Fresh Produce',
    description: 'Assorted vegetables and fruits that are still fresh but won\'t make it to tomorrow\'s display.',
    category: 'produce',
    quantity: '25 lbs',
    expiration: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    pickupWindow: {
      start: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      end: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
    },
    status: 'available',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    address: '456 Oak Ave, Anytown, USA',
    coordinates: {
      lat: 40.7282,
      lng: -73.9942
    },
    images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation3',
    providerId: 'provider1',
    providerName: 'Fresh Harvest Restaurant',
    title: 'Prepared Meals - Pasta Dishes',
    description: 'Leftover pasta dishes from catering event. About 10 portions in sealed containers.',
    category: 'prepared',
    quantity: '10 meal containers',
    expiration: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    pickupWindow: {
      start: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      end: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
    },
    status: 'scheduled',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    address: '123 Main St, Anytown, USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    claimedBy: {
      id: 'charity1',
      name: 'Hope Community Shelter',
      contactPerson: 'Jane Smith',
      phone: '(555) 456-7890'
    },
    scheduledPickup: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    images: ['https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation4',
    providerId: 'provider2',
    providerName: 'Green Grocers Market',
    title: 'Dairy Products Near Expiration',
    description: 'Milk, yogurt, and cheese products that are approaching their sell-by date but are still good.',
    category: 'dairy',
    quantity: '20 items',
    expiration: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    pickupWindow: {
      start: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      end: new Date(Date.now() + 10 * 60 * 60 * 1000) // 10 hours from now
    },
    status: 'in transit',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    address: '456 Oak Ave, Anytown, USA',
    coordinates: {
      lat: 40.7282,
      lng: -73.9942
    },
    claimedBy: {
      id: 'charity2',
      name: 'Sunshine Food Bank',
      contactPerson: 'Robert Johnson',
      phone: '(555) 567-8901'
    },
    scheduledPickup: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    images: ['https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation5',
    providerId: 'provider1',
    providerName: 'Fresh Harvest Restaurant',
    title: 'Canned Goods Surplus',
    description: 'Assorted canned vegetables, fruits, and beans that we no longer need.',
    category: 'canned',
    quantity: '40 cans',
    expiration: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
    pickupWindow: {
      start: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      end: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours from now
    },
    status: 'delivered',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
    address: '123 Main St, Anytown, USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    claimedBy: {
      id: 'charity1',
      name: 'Hope Community Shelter',
      contactPerson: 'Jane Smith',
      phone: '(555) 456-7890'
    },
    scheduledPickup: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    images: ['https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  // Adding 4 more donation items
  {
    id: 'donation6',
    providerId: 'provider2',
    providerName: 'Green Grocers Market',
    title: 'Fresh Organic Fruits',
    description: 'Assortment of organic apples, bananas, and berries that need to be distributed quickly.',
    category: 'produce',
    quantity: '30 lbs',
    expiration: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    pickupWindow: {
      start: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      end: new Date(Date.now() + 7 * 60 * 60 * 1000) // 7 hours from now
    },
    status: 'available',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    address: '456 Oak Ave, Anytown, USA',
    coordinates: {
      lat: 40.7282,
      lng: -73.9942
    },
    images: ['https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation7',
    providerId: 'provider1',
    providerName: 'Fresh Harvest Restaurant',
    title: 'Surplus Baked Goods',
    description: 'Freshly baked muffins, cookies, and pastries from our bakery section. Still perfect for consumption.',
    category: 'bakery',
    quantity: '25 items (approx. 10 lbs)',
    expiration: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    pickupWindow: {
      start: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      end: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
    },
    status: 'available',
    createdAt: new Date(),
    address: '123 Main St, Anytown, USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    images: ['https://images.unsplash.com/photo-1506224772180-d75b3efbe9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation8',
    providerId: 'provider2',
    providerName: 'Green Grocers Market',
    title: 'Extra Rice and Pasta',
    description: 'Unopened packages of rice, pasta, and other dry goods nearing best-by date but still perfectly good.',
    category: 'dry goods',
    quantity: '50 lbs (20 packages)',
    expiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    pickupWindow: {
      start: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      end: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours from now
    },
    status: 'available',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    address: '456 Oak Ave, Anytown, USA',
    coordinates: {
      lat: 40.7282,
      lng: -73.9942
    },
    images: ['https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  },
  {
    id: 'donation9',
    providerId: 'provider1',
    providerName: 'Fresh Harvest Restaurant',
    title: 'Surplus Prepared Sandwiches',
    description: 'Freshly made sandwiches from our catering order. Variety of vegetarian and meat options available.',
    category: 'prepared',
    quantity: '30 individually wrapped sandwiches',
    expiration: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    pickupWindow: {
      start: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      end: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
    },
    status: 'available',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    address: '123 Main St, Anytown, USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    images: ['https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80']
  }
];

// Mock Charity Preferences
export const mockCharityPreferences: Record<string, CharityPreference> = {
  charity1: {
    categories: ['bakery', 'produce', 'prepared', 'canned'],
    minQuantity: '5 lbs',
    pickupDays: [1, 2, 3, 4, 5], // Monday-Friday
    pickupTimes: {
      start: '09:00',
      end: '17:00'
    },
    serviceRadius: 10
  },
  charity2: {
    categories: ['produce', 'dairy', 'canned', 'dry goods'],
    pickupDays: [1, 3, 5], // Monday, Wednesday, Friday
    pickupTimes: {
      start: '10:00',
      end: '16:00'
    },
    serviceRadius: 15
  }
};
