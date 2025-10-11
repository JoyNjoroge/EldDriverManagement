import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../styles/colors';

// Main Card Component
export const Card = ({ 
  children, 
  style, 
  onPress,
  ...props 
}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

// Card Header Component
export const CardHeader = ({ 
  children, 
  style 
}) => (
  <View style={[styles.cardHeader, style]}>
    {children}
  </View>
);

// Card Title Component
export const CardTitle = ({ 
  children, 
  style,
  textStyle 
}) => (
  <View style={[styles.cardTitle, style]}>
    {typeof children === 'string' ? (
      <Text style={[styles.cardTitleText, textStyle]}>
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
);

// Card Content Component
export const CardContent = ({ 
  children, 
  style 
}) => (
  <View style={[styles.cardContent, style]}>
    {children}
  </View>
);

// Card Footer Component
export const CardFooter = ({ 
  children, 
  style 
}) => (
  <View style={[styles.cardFooter, style]}>
    {children}
  </View>
);

// Card Description Component
export const CardDescription = ({ 
  children, 
  style,
  textStyle 
}) => (
  <View style={[styles.cardDescription, style]}>
    {typeof children === 'string' ? (
      <Text style={[styles.cardDescriptionText, textStyle]}>
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 0,
    marginVertical: 4,
    marginHorizontal: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  cardDescription: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  cardDescriptionText: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    lineHeight: 20,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardFooter: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Card;