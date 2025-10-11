import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';

export const Progress = ({ 
  value, 
  style, 
  showLabel = false,
  color = COLORS.PRIMARY,
  backgroundColor = COLORS.GRAY_200 
}) => {
  const percentage = Math.min(Math.max(value || 0, 0), 100);
  
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.track, { backgroundColor }]}>
        <View 
          style={[
            styles.progress,
            { 
              width: `${percentage}%`,
              backgroundColor: color
            }
          ]} 
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>{percentage}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_600,
    minWidth: 30,
  },
});

export default Progress;