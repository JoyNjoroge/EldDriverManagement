import React from 'react';
import { View, Text } from 'react-native';
export const HelloWave = ({ style, ...props }) => (
  <View style={style} {...props}><Text>Hello 👋</Text></View>
);
export default HelloWave;
