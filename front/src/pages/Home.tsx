import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { DonationsList } from '@/components/donations/DonationsList';
import { MapPlaceholder } from '@/components/map/MapPlaceholder';
import { useDonations } from '@/contexts/DonationsContext';

const Home = () => {
  const { donations, isLoading } = useDonations();

  // Get 13 featured donations (adding 5 more as requested)
  const availableDonations = donations.filter(d => d.status === 'available').slice(0, 13);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Rescue Food, <span className="text-primary">Fight Hunger</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                Join our network connecting food businesses with surplus inventory to local charities and shelters. Together, we can reduce waste and feed those in need.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="font-medium">Get Started</Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="font-medium">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="lg:relative lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="People distributing food"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect surplus food with those who need it most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">1. List Donations</h3>
              <p className="mt-2 text-gray-600">
                Restaurants and grocery stores list their available surplus food with pickup details.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">2. Find & Claim</h3>
              <p className="mt-2 text-gray-600">
                Charities browse available donations and claim what they need for their community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">3. Pickup & Deliver</h3>
              <p className="mt-2 text-gray-600">
                Coordinate pickup times and track donations until they reach those in need.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Donations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Donations</h2>
            <Link to="/donations">
              <Button variant="link" className="font-medium">View All</Button>
            </Link>
          </div>
          
          <DonationsList donations={availableDonations} isLoading={isLoading} />
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Find Nearby Donations</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Use our interactive map to find available food donations near you.
            </p>
          </div>
          
          <MapPlaceholder />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Join the Food Rescue Network Today</h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
            Whether you're a food business with surplus or a charity in need, become part of the solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-medium">Sign Up Now</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
