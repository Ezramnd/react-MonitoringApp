import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../services/AuthContext'; // Impor
import { useEffect } from 'react';

// Pisahkan komponen layout utama agar bisa menggunakan hook useAuth
const InitialLayout = () => {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Tunggu sampai selesai loading token

    const inAuthGroup = segments[0] === '(tabs)';

    if (!token && inAuthGroup) {
      // Jika tidak ada token dan user ada di dalam app, tendang ke login
      router.replace('/login');
    } else if (token && !inAuthGroup) {
      // Jika ada token dan user ada di luar (misal di login), masukkan ke app
      router.replace('/(tabs)');
    }
  }, [token, isLoading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}