import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DonationCard } from '@/components/donations/DonationCard';
import { useDonations } from '@/contexts/DonationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { getUserDonations } = useDonations();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const userDonations = getUserDonations();
  
  // Calculate stats based on user role
  const stats = {
    totalDonations: userDonations.length,
    active: userDonations.filter(d => ['available', 'scheduled', 'in transit'].includes(d.status)).length,
    completed: userDonations.filter(d => d.status === 'delivered').length,
  };
  
  // Chart data
  const chartData = [
    { name: 'Active', value: stats.active, color: '#4CAF50' },
    { name: 'Completed', value: stats.completed, color: '#9E9E9E' },
  ];

  // Role-specific content
  const renderRoleContent = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'provider':
        return (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Your Donations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userDonations.length > 0 ? (
                userDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="text-lg font-medium">No donations yet</h3>
                  <p className="mt-1 text-gray-500">List your first donation to get started</p>
                  <Button className="mt-4" asChild>
                    <Link to="/create-donation">Create Donation</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'charity':
        return (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Your Claimed Donations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userDonations.length > 0 ? (
                userDonations.map(donation => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium">No claimed donations yet</h3>
                  <p className="mt-1 text-gray-500">Browse available donations to claim</p>
                  <Button className="mt-4" asChild>
                    <Link to="/donations">Find Donations</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'admin':
        return (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Donations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userDonations.slice(0, 6).map(donation => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold">Please log in to access your dashboard</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, {user.name} ({user.organization})
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDonations}</div>
                  <p className="text-xs text-muted-foreground">
                    {user.role === 'provider' ? 'Items you\'ve donated' : 'Items you\'ve received'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.active}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently in progress
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <p className="text-xs text-muted-foreground">
                    Completed donations
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Status</CardTitle>
                  <CardDescription>
                    Overview of your donation activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-60 w-full max-w-xs">
                    {stats.totalDonations > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">No data available yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks for your role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.role === 'provider' && (
                      <>
                        <Button className="w-full" asChild>
                          <Link to="/create-donation">Create New Donation</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/donations?filter=provider">View Your Donations</Link>
                        </Button>
                      </>
                    )}
                    
                    {user.role === 'charity' && (
                      <>
                        <Button className="w-full" asChild>
                          <Link to="/donations">Find Available Donations</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/profile/preferences">Update Preferences</Link>
                        </Button>
                      </>
                    )}
                    
                    {user.role === 'admin' && (
                      <>
                        <Button className="w-full" asChild>
                          <Link to="/admin/users">Manage Users</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/admin/reports">View Reports</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {renderRoleContent()}
          </TabsContent>
          
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>{user.role === 'provider' ? 'Your Donations' : 'Your Claimed Donations'}</CardTitle>
                <CardDescription>
                  Manage your {user.role === 'provider' ? 'listed donations' : 'claimed items'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userDonations.length > 0 ? (
                    userDonations.map(donation => (
                      <DonationCard key={donation.id} donation={donation} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No donations available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  View and update your profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Name</h3>
                    <p className="text-gray-600">{user.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Organization</h3>
                    <p className="text-gray-600">{user.organization}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">{user.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Role</h3>
                    <p className="text-gray-600">
                      {user.role === 'provider' ? 'Food Provider' : 
                       user.role === 'charity' ? 'Charity Organization' : 'Administrator'}
                    </p>
                  </div>
                  
                  <Button className="mt-4" asChild>
                    <Link to="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
