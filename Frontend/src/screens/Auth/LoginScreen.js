import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import COLORS from '../../styles/colors';

export default function LoginScreen() {
  const theme = useTheme();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('driver@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your driver account</Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
          >
            Sign In
          </Button>

          {/* Demo Credentials */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Email: driver@example.com</Text>
            <Text style={styles.demoText}>Password: password</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ELD Management System v1.0
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.GRAY_600,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: COLORS.ERROR,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  loginButtonContent: {
    height: 48,
  },
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: COLORS.GRAY_50,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
});