import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate it
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // TODO: Validate token with backend
          // For now, we'll just simulate a user
          setUser({
            id: '1',
            email: 'user@example.com',
            name: 'Demo User',
            role: 'user'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login logic with backend
      // For now, we'll just simulate a successful login
      const user = {
        id: '1',
        email,
        name: 'Demo User',
        role: 'user' as const
      };
      setUser(user);
      localStorage.setItem('auth_token', 'dummy_token');
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement actual signup logic with backend
      // For now, we'll just simulate a successful signup
      const user = {
        id: '1',
        email,
        name,
        role: 'user' as const
      };
      setUser(user);
      localStorage.setItem('auth_token', 'dummy_token');
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = async () => {
    try {
      // TODO: Implement actual logout logic with backend
      setUser(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 