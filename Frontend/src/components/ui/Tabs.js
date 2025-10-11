import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';

export const Tabs = ({ children, style }) => {
  return (
    <View style={[styles.tabsContainer, style]}>
      {children}
    </View>
  );
};

export const TabsList = ({ children, style }) => {
  return (
    <View style={[styles.tabsList, style]}>
      {children}
    </View>
  );
};

export const TabsTrigger = ({ 
  children, 
  value, 
  activeValue, 
  onPress, 
  style,
  textStyle 
}) => {
  const isActive = value === activeValue;
  
  return (
    <TouchableOpacity
      style={[
        styles.tabTrigger,
        isActive && styles.tabTriggerActive,
        style
      ]}
      onPress={() => onPress(value)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.tabText,
        isActive && styles.tabTextActive,
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const TabsContent = ({ children, value, activeValue, style }) => {
  if (value !== activeValue) return null;
  
  return (
    <View style={[styles.tabContent, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
    padding: 4,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTriggerActive: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_600,
  },
  tabTextActive: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  tabContent: {
    marginTop: 16,
  },
});

export default Tabs;