import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDonations } from '@/contexts/DonationsContext';

const AdminReports = () => {
  const { donations } = useDonations();
  const [activeTab, setActiveTab] = useState('donations');

  // Compute statistics from donations data
  const totalDonations = donations.length;
  const claimedDonations = donations.filter(d => d.status === 'scheduled' || d.status === 'delivered').length;
  const availableDonations = donations.filter(d => d.status === 'available').length;
  
  // Get top providers (organizations with most donations)
  const providerCounts = donations.reduce((acc, donation) => {
    const { providerName } = donation;
    if (!acc[providerName]) {
      acc[providerName] = 0;
    }
    acc[providerName]++;
    return acc;
  }, {} as Record<string, number>);
  
  const topProviders = Object.entries(providerCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Get top categories
  const categoryCounts = donations.reduce((acc, donation) => {
    const { category } = donation;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count]) => ({ name, count }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Reports</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDonations}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Claimed Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{claimedDonations}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableDonations}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different report views */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="donations">Donations Overview</TabsTrigger>
            <TabsTrigger value="providers">Top Providers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.slice(0, 10).map(donation => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.title}</TableCell>
                        <TableCell>{donation.providerName}</TableCell>
                        <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="capitalize">{donation.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="providers" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Food Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider Name</TableHead>
                      <TableHead className="text-right">Donations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProviders.map(provider => (
                      <TableRow key={provider.name}>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell className="text-right">{provider.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Donation Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCategories.map(category => (
                      <TableRow key={category.name}>
                        <TableCell className="font-medium capitalize">{category.name}</TableCell>
                        <TableCell className="text-right">{category.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminReports;
