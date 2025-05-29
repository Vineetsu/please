import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
}

// Map of valid passwords for mock users
const mockPasswords: Record<string, string> = {
  'admin@foodrescue.org': 'admin123',
  'info@freshharvest.com': 'rest123',
  'help@hopeshelter.org': 'charity123',
  'contact@greengroc.com': 'rest123',
  'info@sunshinefoodbank.org': 'charity123'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('foodRescueUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if the email exists and the password matches
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && mockPasswords[email.toLowerCase()] === password) {
      setUser(foundUser);
      localStorage.setItem('foodRescueUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodRescueUser');
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, just pretend registration worked
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
