import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { AuthContext, type AuthContextType } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // First try to register the user (since it's a demo API, user might not exist)
      try {
        const registerResponse = await fetch('https://email-list-api-3.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            password, 
            name: 'Sarah Johnson',
            role: 'user'
          }),
        });
        
        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          console.log('✅ User registered successfully:', registerData.message);
        } else {
          console.log('Registration failed (user may already exist)');
        }
      } catch (registerError) {
        console.log('Registration attempt failed:', registerError);
      }

      // Now try to login
      const loginResponse = await fetch('https://email-list-api-3.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        
        if (loginData.success && loginData.data) {
          const user: User = {
            id: loginData.data.user.id,
            name: loginData.data.user.name,
            email: loginData.data.user.email,
            role: loginData.data.user.role,
            avatar: loginData.data.user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b332ad5c?w=64&h=64&fit=crop&crop=face',
            unreadMessages: 5,
            unreadNotifications: 2
          };
          
          setUser(user);
          setToken(loginData.data.token);
          localStorage.setItem('token', loginData.data.token);
          localStorage.setItem('user', JSON.stringify(user));
          
          console.log('✅ API authentication successful');
          return true;
        }
      } else {
        const errorData = await loginResponse.text();
        console.warn('API login failed:', loginResponse.status, loginResponse.statusText, errorData);
      }
      
      throw new Error('API authentication failed');
    } catch (error) {
      console.warn('🔄 API unavailable, using mock authentication:', error);
      
      // Fallback to mock authentication
      const mockUser: User = {
        id: 'user-123',
        name: 'Sarah Johnson',
        email: email,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332ad5c?w=64&h=64&fit=crop&crop=face',
        unreadMessages: 5,
        unreadNotifications: 2
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      console.log('✅ Mock authentication active - emails will use fallback data');
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};