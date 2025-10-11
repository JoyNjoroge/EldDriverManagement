import 'expo-router/entry';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { HosProvider } from './src/context/HosContext';
import AppNavigator from './src/navigation/AppNavigator';
// eslint-disable-next-line import/no-named-as-default
import theme from './src/styles/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <HosProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </HosProvider>
      </AuthProvider>
    </PaperProvider>
  );
}