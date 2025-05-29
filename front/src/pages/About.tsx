import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">Our Mission</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              To create a seamless, real-time system that enables surplus food to be rerouted to those in need—safely, swiftly, and sustainably.
            </p>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-600">
                We envision a world where no good food goes to waste while people go hungry. Food Rescue Network bridges the gap between surplus and scarcity through technology and community.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                By connecting restaurants and grocery stores with local charities and shelters, we're creating a more efficient, equitable food system for all.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Community food sharing"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-4 text-lg text-gray-600">
              Together with our partners, we're making a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <p className="mt-2 text-lg text-gray-600">Meals Rescued</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary">50+</div>
              <p className="mt-2 text-lg text-gray-600">Partner Organizations</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-primary">2,500 kg</div>
              <p className="mt-2 text-lg text-gray-600">CO₂ Emissions Prevented</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section - Updated with only two members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Passionate individuals dedicated to fighting food waste and hunger.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {/* First Team Member */}
            <div className="text-center">
              <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-48 h-48 flex items-center justify-center">
                <span className="text-3xl text-gray-500">VN</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Vineet</h3>
              <p className="text-gray-600">Co-Founder</p>
            </div>
            
            {/* Second Team Member */}
            <div className="text-center">
              <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-48 h-48 flex items-center justify-center">
                <span className="text-3xl text-gray-500">VK</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Vaishakh</h3>
              <p className="text-gray-600">Co-Founder</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join the Movement</h2>
          <p className="mt-4 text-lg text-gray-600">
            Whether you're a restaurant with surplus food, a charity in need, or just someone who wants to make a difference, there's a place for you in our network.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
