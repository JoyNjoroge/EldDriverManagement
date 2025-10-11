import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import LogManagementScreen from '../screens/LogManagementscreen';
import InspectionModeScreen from '../screens/InspectionModeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'clock' : 'clock-outline';
          } else if (route.name === 'Logs') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Inspection') {
            iconName = focused ? 'qrcode' : 'qrcode-scan';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.disabled,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Logs" 
        component={LogManagementScreen}
        options={{ tabBarLabel: 'Logs' }}
      />
      <Tab.Screen 
        name="Inspection" 
        component={InspectionModeScreen}
        options={{ tabBarLabel: 'Inspection' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}