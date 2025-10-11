import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';
export const ExternalLink = ({ href, children, ...props }) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)} {...props}>
    <Text>{children}</Text>
  </TouchableOpacity>
);
export default ExternalLink;
