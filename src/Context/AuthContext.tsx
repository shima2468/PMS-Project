import { createContext, useEffect, useState, type JSX } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
}

interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthProviderProps): JSX.Element {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);

  const saveLoginData = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setLoginData(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        setLoginData(null);
      }
    }
  };

  useEffect(() => {

    if (localStorage.getItem('token')) {
      saveLoginData();
    }


    const handleStorage = () => {
      saveLoginData();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}