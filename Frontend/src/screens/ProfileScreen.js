import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import COLORS from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useHos } from '../context/HosContext';

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { currentStatus, hosData } = useHos();
  
  const [settings, setSettings] = useState({
    darkMode: false,
    offlineMode: true,
    voiceAlerts: true,
    autoCertify: false,
    locationTracking: true,
    harshBrakingAlerts: true,
    speedLimitAlerts: true,
    inspectionReminders: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: logout,
          style: 'destructive'
        },
      ]
    );
  };

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing would open here');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change screen would open here');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support contact options would appear here');
  };

  const handleViewDocuments = () => {
    Alert.alert('Documents', 'Document management screen would open here');
  };

  const handleTrainingMaterials = () => {
    Alert.alert('Training', 'Training materials would open here');
  };

  const driverStats = [
    { label: 'Total Miles', value: '12,456', icon: 'map-marker-distance', color: COLORS.PRIMARY },
    { label: 'Trips This Month', value: '18', icon: 'truck', color: COLORS.SUCCESS },
    { label: 'On-Time Rate', value: '96%', icon: 'clock-check', color: COLORS.INFO },
    { label: 'Safety Score', value: '92/100', icon: 'shield-check', color: COLORS.WARNING },
  ];

  const quickActions = [
    { label: 'Documents', icon: 'file-document', onPress: handleViewDocuments },
    { label: 'Training', icon: 'school', onPress: handleTrainingMaterials },
    { label: 'Support', icon: 'help-circle', onPress: handleContactSupport },
    { label: 'Settings', icon: 'cog', onPress: () => Alert.alert('Settings', 'Settings screen would open') },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <CardContent>
          <View style={styles.profileHeader}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarLargeText}>
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'D'}
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Badge variant="primary" size="small">
                  {currentStatus === 'driving' ? 'Driving' : 
                   currentStatus === 'on-duty' ? 'On Duty' :
                   currentStatus === 'sleeper' ? 'Sleeper' : 'Off Duty'}
                </Badge>
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Driver'}</Text>
              <Text style={styles.profileId}>Driver ID: {user?.id || 'N/A'}</Text>
              <Text style={styles.profileCarrier}>{user?.carrier || 'ABC Trucking Company'}</Text>
              
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{hosData.drive.current}h</Text>
                  <Text style={styles.statLabel}>Drive Today</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{Math.round((hosData.drive.current / hosData.drive.limit) * 100)}%</Text>
                  <Text style={styles.statLabel}>HOS Used</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0</Text>
                  <Text style={styles.statLabel}>Violations</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.profileActions}>
            <Button 
              variant="outline" 
              size="small" 
              onPress={handleEditProfile}
              style={styles.profileButton}
            >
              <Icon name="account-edit" size={16} color={COLORS.PRIMARY} />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              size="small" 
              onPress={handleChangePassword}
              style={styles.profileButton}
            >
              <Icon name="lock-reset" size={16} color={COLORS.PRIMARY} />
              Change Password
            </Button>
          </View>
        </CardContent>
      </Card>

      {/* Driver Statistics */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>Driver Statistics</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.statsGrid}>
            {driverStats.map((stat, index) => (
              <View key={index} style={styles.driverStat}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Icon name={stat.icon} size={20} color={stat.color} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.driverStatValue}>{stat.value}</Text>
                  <Text style={styles.driverStatLabel}>{stat.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <View style={styles.cardTitle}>
              <Icon name="truck" size={20} color={COLORS.GRAY_700} />
              <Text style={styles.cardTitleText}>Vehicle Information</Text>
            </View>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.vehicleInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Vehicle ID:</Text>
              <Text style={styles.infoValue}>{user?.vehicle || 'Truck #4567'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Make/Model:</Text>
              <Text style={styles.infoValue}>Freightliner Cascadia</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year:</Text>
              <Text style={styles.infoValue}>2023</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>VIN:</Text>
              <Text style={styles.infoValue}>1FUJGLD...KLM8912</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Odometer:</Text>
              <Text style={styles.infoValue}>124,567 miles</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Service:</Text>
              <Text style={styles.infoValue}>15 days ago</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <View style={styles.cardTitle}>
              <Icon name="map-marker" size={20} color={COLORS.GRAY_700} />
              <Text style={styles.cardTitleText}>Current Location</Text>
            </View>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.locationSection}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>I-95 North, Mile Marker 247</Text>
              <Text style={styles.locationSubtext}>Near Richmond, Virginia</Text>
              <View style={styles.locationDetails}>
                <View style={styles.locationDetail}>
                  <Icon name="speedometer" size={14} color={COLORS.GRAY_600} />
                  <Text style={styles.locationDetailText}>62 mph</Text>
                </View>
                <View style={styles.locationDetail}>
                  <Icon name="clock" size={14} color={COLORS.GRAY_600} />
                  <Text style={styles.locationDetailText}>Updated 2 min ago</Text>
                </View>
                <View style={styles.locationDetail}>
                  <Icon name="signal" size={14} color={COLORS.GRAY_600} />
                  <Text style={styles.locationDetailText}>Good GPS</Text>
                </View>
              </View>
            </View>
            <View style={styles.locationStatus}>
              <Badge variant="success">Online</Badge>
              <Text style={styles.locationStatusText}>Live Tracking</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>Quick Actions</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickAction}
                onPress={action.onPress}
              >
                <View style={styles.quickActionIcon}>
                  <Icon name={action.icon} size={24} color={COLORS.PRIMARY} />
                </View>
                <Text style={styles.quickActionText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>App Settings</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="weather-night" size={20} color={COLORS.GRAY_700} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Use dark theme</Text>
                </View>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={() => handleSettingToggle('darkMode')}
                trackColor={{ false: COLORS.GRAY_300, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="wifi-off" size={20} color={COLORS.GRAY_700} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Offline Mode</Text>
                  <Text style={styles.settingDescription}>Work without internet</Text>
                </View>
              </View>
              <Switch
                value={settings.offlineMode}
                onValueChange={() => handleSettingToggle('offlineMode')}
                trackColor={{ false: COLORS.GRAY_300, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="microphone" size={20} color={COLORS.GRAY_700} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Voice Alerts</Text>
                  <Text style={styles.settingDescription}>Audio notifications</Text>
                </View>
              </View>
              <Switch
                value={settings.voiceAlerts}
                onValueChange={() => handleSettingToggle('voiceAlerts')}
                trackColor={{ false: COLORS.GRAY_300, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="auto-fix" size={20} color={COLORS.GRAY_700} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Auto-Certify Logs</Text>
                  <Text style={styles.settingDescription}>Automatically certify completed logs</Text>
                </View>
              </View>
              <Switch
                value={settings.autoCertify}
                onValueChange={() => handleSettingToggle('autoCertify')}
                trackColor={{ false: COLORS.GRAY_300, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="map-marker-path" size={20} color={COLORS.GRAY_700} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Location Tracking</Text>
                  <Text style={styles.settingDescription}>GPS and route tracking</Text>
                </View>
              </View>
              <Switch
                value={settings.locationTracking}
                onValueChange={() => handleSettingToggle('locationTracking')}
                trackColor={{ false: COLORS.GRAY_300, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
              />
            </View>
          </View>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>App Information</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.appInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Version:</Text>
              <Text style={styles.infoValue}>1.0.0 (Build 1234)</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Sync:</Text>
              <Text style={styles.infoValue}>2 minutes ago</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Data Usage:</Text>
              <Text style={styles.infoValue}>245 MB this month</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ELD Certification:</Text>
              <Badge variant="success">FMCSA Certified</Badge>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        variant="danger"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Icon name="logout" size={20} color={COLORS.WHITE} />
        Logout
      </Button>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ELD Driver App v1.0.0
        </Text>
        <Text style={styles.footerSubtext}>
          FMCSA Certified Electronic Logging Device
        </Text>
      </View>
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
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarLargeText: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: 24,
  },
  statusBadge: {
    alignSelf: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    marginBottom: 2,
  },
  profileCarrier: {
    fontSize: 14,
    color: COLORS.GRAY_700,
    fontWeight: '500',
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
    padding: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.GRAY_600,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.GRAY_300,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  profileButton: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  driverStat: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_100,
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  driverStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  driverStatLabel: {
    fontSize: 12,
    color: COLORS.GRAY_600,
  },
  vehicleInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_600,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  locationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 4,
  },
  locationSubtext: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationDetailText: {
    fontSize: 12,
    color: COLORS.GRAY_600,
  },
  locationStatus: {
    alignItems: 'center',
  },
  locationStatusText: {
    fontSize: 10,
    color: COLORS.GRAY_600,
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_700,
    textAlign: 'center',
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.GRAY_600,
  },
  appInfo: {
    gap: 8,
  },
  logoutButton: {
    marginBottom: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_600,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
});