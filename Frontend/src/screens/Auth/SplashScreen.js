import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../styles/colors';

export default function SplashScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="truck-fast" size={80} color={theme.colors.primary} />
        <Text style={styles.appName}>ELD Driver</Text>
        <Text style={styles.appSubtitle}>Electronic Logging Device</Text>
      </View>
      
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary} 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginTop: 16,
  },
  appSubtitle: {
    fontSize: 16,
    color: COLORS.GRAY_600,
    marginTop: 8,
  },
  loader: {
    marginTop: 30,
  },
});