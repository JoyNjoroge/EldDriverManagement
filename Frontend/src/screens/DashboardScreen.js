import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useHos } from '../context/HosContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import HosCircularProgress from '../components/HosCircularProgress';
import StatusButton from '../components/StatusButton';
import COLORS from '../styles/colors';
import { DUTY_STATUS_CONFIG } from '../utils/constants';

export default function DashboardScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const { 
    currentStatus, 
    hosData, 
    alerts, 
    changeDutyStatus 
  } = useHos();

  const handleStatusChange = (statusId) => {
    Alert.alert(
      'Change Status',
      `Are you sure you want to change to ${DUTY_STATUS_CONFIG[statusId].label}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => changeDutyStatus(statusId),
          style: 'default'
        },
      ]
    );
  };

  const handleQuickAction = (action) => {
    Alert.alert(
      'Quick Action',
      `${action} feature would be implemented here`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome, {user?.name || 'Driver'}</Text>
          <Text style={styles.driverId}>Driver ID: {user?.id || 'N/A'}</Text>
          <Text style={styles.vehicleInfo}>{user?.vehicle || 'No vehicle assigned'}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.split(' ').map(n => n[0]).join('') || 'D'}
          </Text>
        </View>
      </View>

      {/* HOS Status Cards */}
      <View style={styles.hosContainer}>
        <HosCircularProgress
          label="Drive"
          current={hosData.drive.current}
          limit={hosData.drive.limit}
          type="drive"
        />
        <HosCircularProgress
          label="On Duty"
          current={hosData.onDuty.current}
          limit={hosData.onDuty.limit}
          type="onDuty"
        />
        <HosCircularProgress
          label="Cycle"
          current={hosData.cycle.current}
          limit={hosData.cycle.limit}
          type="cycle"
        />
      </View>

      {/* Current Status */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <View style={styles.cardTitle}>
              <Text style={styles.cardTitleText}>Current Status</Text>
              <Badge 
                variant={
                  currentStatus === 'driving' ? 'primary' :
                  currentStatus === 'on-duty' ? 'error' :
                  currentStatus === 'sleeper' ? 'success' : 'outline'
                }
              >
                {DUTY_STATUS_CONFIG[currentStatus]?.label || 'Off Duty'}
              </Badge>
            </View>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.statusGrid}>
            {Object.entries(DUTY_STATUS_CONFIG).map(([statusId, status]) => (
              <StatusButton
                key={statusId}
                status={status}
                isActive={currentStatus === statusId}
                onPress={() => handleStatusChange(statusId)}
              />
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.cardTitle}>
                <Text style={styles.cardTitleText}>Alerts</Text>
                <Badge variant="warning">{alerts.length}</Badge>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.alertsContainer}>
              {alerts.map((alert) => (
                <View 
                  key={alert.id} 
                  style={[
                    styles.alert,
                    alert.severity === 'violation' ? styles.alertViolation : styles.alertWarning
                  ]}
                >
                  <View style={styles.alertContent}>
                    <Text style={styles.alertMessage}>{alert.message}</Text>
                    <Text style={styles.alertTime}>{alert.timeRemaining} remaining</Text>
                  </View>
                  <Badge 
                    variant={alert.severity === 'violation' ? 'error' : 'warning'}
                    size="small"
                  >
                    {alert.severity === 'violation' ? 'Violation' : 'Warning'}
                  </Badge>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>Quick Actions</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.actionsGrid}>
            <Button
              variant="outline"
              style={styles.actionButton}
              onPress={() => handleQuickAction('Start Trip')}
            >
              <View style={styles.actionContent}>
                <Text style={styles.actionIcon}>🚛</Text>
                <Text style={styles.actionText}>Start Trip</Text>
              </View>
            </Button>
            <Button
              variant="outline"
              style={styles.actionButton}
              onPress={() => handleQuickAction('Edit Log')}
            >
              <View style={styles.actionContent}>
                <Text style={styles.actionIcon}>📝</Text>
                <Text style={styles.actionText}>Edit Log</Text>
              </View>
            </Button>
            <Button
              variant="outline"
              style={styles.actionButton}
              onPress={() => handleQuickAction('Vehicle Check')}
            >
              <View style={styles.actionContent}>
                <Text style={styles.actionIcon}>🔍</Text>
                <Text style={styles.actionText}>Vehicle Check</Text>
              </View>
            </Button>
            <Button
              variant="outline"
              style={styles.actionButton}
              onPress={() => handleQuickAction('Documents')}
            >
              <View style={styles.actionContent}>
                <Text style={styles.actionIcon}>📄</Text>
                <Text style={styles.actionText}>Documents</Text>
              </View>
            </Button>
          </View>
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>Current Location</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>I-95, Mile Marker 247</Text>
            <Text style={styles.locationSubtext}>Virginia • Last updated: 2 min ago</Text>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  driverId: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    marginTop: 4,
  },
  vehicleInfo: {
    fontSize: 12,
    color: COLORS.GRAY_500,
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
    fontSize: 16,
  },
  hosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  alertsContainer: {
    gap: 12,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  alertWarning: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.WARNING,
  },
  alertViolation: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ERROR,
  },
  alertContent: {
    flex: 1,
    marginRight: 12,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    color: COLORS.GRAY_600,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    height: 80,
  },
  actionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_700,
    textAlign: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 4,
  },
  locationSubtext: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    textAlign: 'center',
  },
});