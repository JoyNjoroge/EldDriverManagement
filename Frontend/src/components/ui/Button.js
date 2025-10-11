import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import COLORS from '../../styles/colors';

export const Button = ({ 
  children, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? COLORS.GRAY_300 : theme.colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? COLORS.GRAY_300 : theme.colors.primary,
          borderWidth: 2,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? COLORS.GRAY_300 : COLORS.GRAY_400,
          borderWidth: 1,
        };
      case 'danger':
        return {
          backgroundColor: disabled ? COLORS.GRAY_300 : COLORS.ERROR,
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: disabled ? COLORS.GRAY_300 : theme.colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          height: 36,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          height: 56,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          height: 48,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return COLORS.WHITE;
      case 'secondary':
        return disabled ? COLORS.GRAY_300 : theme.colors.primary;
      case 'outline':
        return disabled ? COLORS.GRAY_300 : COLORS.GRAY_700;
      default:
        return COLORS.WHITE;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={getTextColor()} 
        />
      ) : (
        <Text style={[
          styles.buttonText,
          { color: getTextColor() },
          textStyle,
        ]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;