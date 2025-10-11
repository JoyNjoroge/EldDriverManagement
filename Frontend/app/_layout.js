import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@/src/context/AuthContext';
import { HosProvider } from '@/src/context/HosContext';
import theme from '@/src/styles/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <HosProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="modal" 
              options={{ 
                presentation: 'modal',
                headerShown: true,
                title: 'Info'
              }} 
            />
          </Stack>
          <StatusBar style="auto" />
        </HosProvider>
      </AuthProvider>
    </PaperProvider>
  );
}