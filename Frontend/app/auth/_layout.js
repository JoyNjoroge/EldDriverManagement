import { Stack } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to tabs
  useEffect(() => {
    if (isAuthenticated) {
      // This will be handled by the AuthContext checkAuthStatus
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      {/* You can add register screen later */}
      {/* <Stack.Screen name="register" /> */}
    </Stack>
  );
}