import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './api'; // Impor apiClient kita

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
        // Set header default untuk request selanjutnya
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (data: any) => {
    const response = await apiClient.post('/login', data);
    const { accessToken } = response.data;
    setToken(accessToken);
    // Set header default untuk request selanjutnya
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    await AsyncStorage.setItem('accessToken', accessToken);
  };

  const logout = async () => {
    setToken(null);
    // Hapus header default
    delete apiClient.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};