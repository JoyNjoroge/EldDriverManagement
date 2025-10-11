import React from 'react';
import { View, Text } from 'react-native';

export const IconSymbol = ({ name, size = 24, color = '#000' }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color, fontSize: size * 0.6 }}>{name?.[0] ?? '?'}</Text>
  </View>
);

export default IconSymbol;
