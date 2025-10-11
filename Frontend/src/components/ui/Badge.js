import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';

export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.PRIMARY_LIGHT,
          borderColor: COLORS.PRIMARY,
        };
      case 'success':
        return {
          backgroundColor: '#D1FAE5',
          borderColor: COLORS.SUCCESS,
        };
      case 'warning':
        return {
          backgroundColor: '#FEF3C7',
          borderColor: COLORS.WARNING,
        };
      case 'error':
        return {
          backgroundColor: '#FEE2E2',
          borderColor: COLORS.ERROR,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.GRAY_300,
        };
      default:
        return {
          backgroundColor: COLORS.GRAY_100,
          borderColor: COLORS.GRAY_300,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
        };
      case 'large':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
        };
      case 'medium':
      default:
        return {
          paddingHorizontal: 10,
          paddingVertical: 5,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return COLORS.PRIMARY_DARK;
      case 'success':
        return '#065F46';
      case 'warning':
        return '#92400E';
      case 'error':
        return '#991B1B';
      case 'outline':
        return COLORS.GRAY_700;
      default:
        return COLORS.GRAY_700;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      case 'medium':
      default:
        return 12;
    }
  };

  return (
    <View style={[
      styles.badge,
      getVariantStyles(),
      getSizeStyles(),
      style,
    ]}>
      <Text style={[
        styles.badgeText,
        { 
          color: getTextColor(),
          fontSize: getTextSize(),
        },
        textStyle,
      ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Badge;