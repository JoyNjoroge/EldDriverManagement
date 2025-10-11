import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';

export const Progress = ({ value, style, showLabel = false }) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <View 
          style={[
            styles.progress,
            { width: `${percentage}%` }
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
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_600,
    minWidth: 30,
  },
});

export default Progress;