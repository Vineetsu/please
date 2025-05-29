import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUsers } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Eye, Edit } from 'lucide-react';
import { User } from '@/lib/types';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">User Management</h1>
          <div className="flex gap-4">
            <div className="relative w-full md:w-auto">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[250px]"
              />
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.organization}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-semibold text-sm">Name</h3>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Email</h3>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Role</h3>
                  <p className="capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Organization</h3>
                  <p>{selectedUser.organization}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Address</h3>
                  <p>{selectedUser.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Phone</h3>
                  <p>{selectedUser.phone}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <Input 
                  id="name" 
                  value={selectedUser.name} 
                  readOnly 
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  value={selectedUser.email} 
                  readOnly 
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium">Role</label>
                <Input 
                  id="role" 
                  value={selectedUser.role} 
                  readOnly 
                  className="w-full mt-1 capitalize"
                />
              </div>
              <div>
                <label htmlFor="org" className="block text-sm font-medium">Organization</label>
                <Input 
                  id="org" 
                  value={selectedUser.organization} 
                  readOnly 
                  className="w-full mt-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This is a demo. User editing is available when connected to a backend database.
              </p>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setEditDialogOpen(false);
              // In a real app with a backend, you would save changes here
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminUsers;
