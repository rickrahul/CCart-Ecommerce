import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '../components/ui/Toaster';

// Define types
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hardcoded users for demo
      if (email === 'admin@example.com' && password === 'password') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return;
      }
      
      if (email === 'user@example.com' && password === 'password') {
        const regularUser: User = {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          isAdmin: false
        };
        setUser(regularUser);
        localStorage.setItem('user', JSON.stringify(regularUser));
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, any registration is successful
      const newUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        isAdmin: false
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};