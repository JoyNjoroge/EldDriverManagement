import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../styles/colors';

export default function StatusButton({ status, isActive, onPress }) {
  const getButtonStyles = () => {
    if (isActive) {
      return {
        backgroundColor: status.color,
        borderColor: status.color,
      };
    }
    return {
      backgroundColor: COLORS.WHITE,
      borderColor: status.color,
    };
  };

  const getTextStyles = () => {
    if (isActive) {
      return {
        color: COLORS.WHITE,
      };
    }
    return {
      color: status.color,
    };
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon 
        name={status.icon} 
        size={20} 
        color={isActive ? COLORS.WHITE : status.color} 
      />
      <Text style={[
        styles.buttonText,
        getTextStyles(),
      ]}>
        {status.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '48%',
    height: 64,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});