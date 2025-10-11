import React from 'react';
import { TouchableOpacity } from 'react-native';

// Minimal TabButton wrapper used by expo-router's Tabs.tabBarButton
export const HapticTab = React.forwardRef(({ children, onPress, ...props }, ref) => (
  <TouchableOpacity ref={ref} onPress={onPress} {...props}>
    {children}
  </TouchableOpacity>
));

HapticTab.displayName = 'HapticTab';

export default HapticTab;
