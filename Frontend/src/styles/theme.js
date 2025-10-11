import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007BFF',
    secondary: '#28A745',
    accent: '#FFC107',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    error: '#DC2626',
    text: '#343A40',
    disabled: '#6B7280',
    placeholder: '#9CA3AF',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 8,
};

export default theme;