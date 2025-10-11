import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import COLORS from '../styles/colors';
import { formatHosTime } from '../utils/formatters';

export default function HosCircularProgress({ label, current, limit, type = 'drive' }) {
  const percentage = (current / limit) * 100;
  const remaining = limit - current;
  
  // Determine status color based on percentage and type
  const getStatusColor = () => {
    if (percentage >= 90) return COLORS.ERROR;
    if (percentage >= 75) return COLORS.WARNING;
    
    switch (type) {
      case 'drive':
        return COLORS.PRIMARY;
      case 'onDuty':
        return '#DC2626';
      case 'cycle':
        return COLORS.WARNING;
      default:
        return COLORS.SUCCESS;
    }
  };

  const statusColor = getStatusColor();
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getStatusLabel = () => {
    if (percentage >= 90) return 'Violation';
    if (percentage >= 75) return 'Warning';
    return 'Good';
  };

  return (
    <View style={styles.container}>
      <View style={styles.circularProgress}>
        <Svg width={90} height={90} viewBox="0 0 100 100">
          {/* Background circle */}
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke={COLORS.GRAY_200}
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke={statusColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="50, 50"
          />
        </Svg>
        <View style={styles.textOverlay}>
          <Text style={[styles.currentText, { color: statusColor }]}>
            {current}h
          </Text>
          <Text style={styles.limitText}>of {limit}h</Text>
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.remainingText}>
          {formatHosTime(remaining)} left
        </Text>
        <Text style={[styles.statusText, { color: statusColor }]}>
          {getStatusLabel()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flex: 1,
    marginHorizontal: 4,
    minHeight: 160,
  },
  circularProgress: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  limitText: {
    fontSize: 10,
    color: COLORS.GRAY_500,
    fontWeight: '500',
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  remainingText: {
    fontSize: 11,
    color: COLORS.GRAY_600,
    marginBottom: 4,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});