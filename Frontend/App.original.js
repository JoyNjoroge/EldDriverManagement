import 'expo-router/entry';

// app.js serves as the main entry point and delegates to expo-router.
// If you need to run any global initialization (error handlers, analytics), do it here.
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { HosProvider } from './src/context/HosContext';
import AppNavigator from './src/navigation/AppNavigator';
import { default as theme } from './src/styles/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <HosProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </HosProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
