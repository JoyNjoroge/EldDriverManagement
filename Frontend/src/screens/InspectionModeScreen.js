import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import COLORS from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useHos } from '../context/HosContext';

// Mock inspection data
const MOCK_INSPECTION_DATA = {
  driverName: 'John Doe',
  licenseNumber: 'DL123456789',
  vehicleId: 'Truck #4567 - Freightliner Cascadia',
  carrier: 'ABC Trucking Company',
  last7Days: [
    { date: '2024-12-26', totalDrive: '5.5h', totalOnDuty: '8h', violations: 0 },
    { date: '2024-12-25', totalDrive: '8h', totalOnDuty: '10h', violations: 0 },
    { date: '2024-12-24', totalDrive: '7h', totalOnDuty: '9h', violations: 0 },
    { date: '2024-12-23', totalDrive: '6h', totalOnDuty: '8h', violations: 0 },
    { date: '2024-12-22', totalDrive: '0h', totalOnDuty: '0h', violations: 0 },
    { date: '2024-12-21', totalDrive: '9h', totalOnDuty: '11h', violations: 0 },
    { date: '2024-12-20', totalDrive: '8h', totalOnDuty: '10h', violations: 0 }
  ]
};

export default function InspectionModeScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const { hosData } = useHos();
  
  const [isInspectionActive, setIsInspectionActive] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMethod, setExportMethod] = useState(null);
  const [timeActive, setTimeActive] = useState(0);

  // Timer for active inspection mode
  useEffect(() => {
    let interval;
    if (isInspectionActive) {
      interval = setInterval(() => {
        setTimeActive(prev => prev + 1);
      }, 1000);
    } else {
      setTimeActive(0);
    }
    
    return () => clearInterval(interval);
  }, [isInspectionActive]);

  const activateInspectionMode = () => {
    Alert.alert(
      'Activate Inspection Mode',
      'This will make your ELD data available for law enforcement inspection. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Activate', 
          onPress: () => {
            setIsInspectionActive(true);
            Alert.alert(
              'Inspection Mode Active',
              'Your data is now available for inspection. Use QR code or export methods to share with officers.',
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const exportData = (method) => {
    setExportMethod(method);
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          
          // Show success message based on method
          const methodNames = {
            usb: 'USB Export',
            bluetooth: 'Bluetooth Transfer',
            email: 'Email Export'
          };
          
          Alert.alert(
            'Export Complete',
            `${methodNames[method]} completed successfully. Data is ready for inspection.`,
            [{ text: 'OK' }]
          );
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const exitInspectionMode = () => {
    Alert.alert(
      'Exit Inspection Mode',
      'Are you sure you want to exit inspection mode?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Exit', 
          onPress: () => {
            setIsInspectionActive(false);
            setExportProgress(0);
            setIsExporting(false);
            setExportMethod(null);
          }
        },
      ]
    );
  };

  // Inspection Not Active View
  if (!isInspectionActive) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Welcome Card */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.cardTitle}>
                <Icon name="shield-check" size={24} color={COLORS.PRIMARY} />
                <Text style={styles.cardTitleText}>Inspection Mode</Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.welcomeContent}>
              <View style={styles.qrPlaceholder}>
                <Icon name="qrcode" size={80} color={COLORS.GRAY_400} />
                <Text style={styles.qrText}>QR Code Ready</Text>
              </View>
              
              <View style={styles.welcomeText}>
                <Text style={styles.welcomeTitle}>Ready for Inspection</Text>
                <Text style={styles.welcomeDescription}>
                  Activate inspection mode to share your ELD data with law enforcement officers via QR code, USB, or Bluetooth.
                </Text>
              </View>

              <Button
                onPress={activateInspectionMode}
                style={styles.activateButton}
                size="large"
              >
                <Icon name="shield-lock" size={20} color={COLORS.WHITE} />
                Activate Inspection Mode
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <Text style={styles.cardTitleText}>About Inspection Mode</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Icon name="eye" size={20} color={COLORS.SUCCESS} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Data Access</Text>
                  <Text style={styles.infoDescription}>
                    Inspector can view your last 7 days of HOS data and current status
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="transfer" size={20} color={COLORS.SUCCESS} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Multiple Transfer Methods</Text>
                  <Text style={styles.infoDescription}>
                    QR code scanning, USB export, or Bluetooth data transfer
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="lock" size={20} color={COLORS.SUCCESS} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Secure & Read-Only</Text>
                  <Text style={styles.infoDescription}>
                    Data is encrypted and cannot be modified during inspection
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="clock" size={20} color={COLORS.SUCCESS} />
                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>Automatic Timeout</Text>
                  <Text style={styles.infoDescription}>
                    Inspection mode automatically times out after 30 minutes of inactivity
                  </Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <Text style={styles.cardTitleText}>Compliance Status</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.complianceGrid}>
              <View style={styles.complianceItem}>
                <Text style={styles.complianceLabel}>HOS Compliance</Text>
                <Badge variant="success">Compliant</Badge>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.complianceLabel}>Last Inspection</Text>
                <Text style={styles.complianceValue}>45 days ago</Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.complianceLabel}>Violations (30d)</Text>
                <Text style={styles.complianceValue}>0</Text>
              </View>
              <View style={styles.complianceItem}>
                <Text style={styles.complianceLabel}>Certification</Text>
                <Badge variant="success">Current</Badge>
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    );
  }

  // Inspection Active View
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Inspection Active Header */}
      <Card style={[styles.card, styles.activeHeader]}>
        <CardContent>
          <View style={styles.activeHeaderContent}>
            <View style={styles.activeHeaderLeft}>
              <Icon name="shield-lock" size={24} color={COLORS.PRIMARY} />
              <View>
                <Text style={styles.activeTitle}>Inspection Mode Active</Text>
                <Text style={styles.activeTime}>
                  Active for {formatTime(timeActive)}
                </Text>
              </View>
            </View>
            <Badge variant="primary">
              <Icon name="check-circle" size={12} color={COLORS.WHITE} />
              Active
            </Badge>
          </View>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>QR Code Transfer</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.qrSection}>
            <View style={styles.qrCodeContainer}>
              {/* QR Code Placeholder */}
              <View style={styles.qrCode}>
                <Icon name="qrcode" size={120} color={COLORS.GRAY_800} />
                <View style={styles.qrOverlay}>
                  <Text style={styles.qrOverlayText}>ELD DATA</Text>
                  <Text style={styles.qrOverlaySubtext}>Scan to inspect</Text>
                </View>
              </View>
            </View>
            <Text style={styles.qrInstruction}>
              Officer can scan this QR code with their inspection device to access your ELD data
            </Text>
            
            <View style={styles.qrStats}>
              <View style={styles.qrStat}>
                <Text style={styles.qrStatLabel}>Scans Today</Text>
                <Text style={styles.qrStatValue}>0</Text>
              </View>
              <View style={styles.qrStat}>
                <Text style={styles.qrStatLabel}>Last Scan</Text>
                <Text style={styles.qrStatValue}>Never</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Alternative Transfer Methods */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <Text style={styles.cardTitleText}>Alternative Transfer Methods</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.transferMethods}>
            <Button
              variant="outline"
              style={styles.transferButton}
              onPress={() => exportData('usb')}
              disabled={isExporting}
            >
              <Icon name="usb" size={20} color={COLORS.PRIMARY} />
              <View style={styles.transferButtonText}>
                <Text style={styles.transferMethodName}>USB Export</Text>
                <Text style={styles.transferMethodDesc}>Save to USB device</Text>
              </View>
            </Button>

            <Button
              variant="outline"
              style={styles.transferButton}
              onPress={() => exportData('bluetooth')}
              disabled={isExporting}
            >
              <Icon name="bluetooth" size={20} color={COLORS.PRIMARY} />
              <View style={styles.transferButtonText}>
                <Text style={styles.transferMethodName}>Bluetooth Transfer</Text>
                <Text style={styles.transferMethodDesc}>Send to nearby device</Text>
              </View>
            </Button>

            <Button
              variant="outline"
              style={styles.transferButton}
              onPress={() => exportData('email')}
              disabled={isExporting}
            >
              <Icon name="email" size={20} color={COLORS.PRIMARY} />
              <View style={styles.transferButtonText}>
                <Text style={styles.transferMethodName}>Email Export</Text>
                <Text style={styles.transferMethodDesc}>Send as PDF attachment</Text>
              </View>
            </Button>
          </View>

          {/* Export Progress */}
          {isExporting && (
            <View style={styles.exportProgress}>
              <View style={styles.exportProgressHeader}>
                <Text style={styles.exportProgressText}>
                  Preparing data for {exportMethod}...
                </Text>
                <Text style={styles.exportProgressPercent}>{exportProgress}%</Text>
              </View>
              <Progress value={exportProgress} style={styles.progressBar} />
            </View>
          )}
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>
            <View style={styles.cardTitle}>
              <Icon name="eye" size={20} color={COLORS.GRAY_700} />
              <Text style={styles.cardTitleText}>Data Preview (Last 7 Days)</Text>
            </View>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.dataPreview}>
            <View style={styles.driverInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Driver:</Text>
                <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>License:</Text>
                <Text style={styles.infoValue}>{user?.licenseNumber || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Vehicle:</Text>
                <Text style={styles.infoValue}>{user?.vehicle || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Carrier:</Text>
                <Text style={styles.infoValue}>{user?.carrier || 'N/A'}</Text>
              </View>
            </View>

            {/* Data Table */}
            <View style={styles.dataTable}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.tableHeaderCell, styles.flex2]}>Date</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>Drive</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>On Duty</Text>
                <Text style={[styles.tableCell, styles.tableHeaderCell]}>Status</Text>
              </View>
              
              {MOCK_INSPECTION_DATA.last7Days.map((day, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.flex2, styles.dateCell]}>{day.date}</Text>
                  <Text style={styles.tableCell}>{day.totalDrive}</Text>
                  <Text style={styles.tableCell}>{day.totalOnDuty}</Text>
                  <View style={styles.tableCell}>
                    {day.violations === 0 ? (
                      <Icon name="check-circle" size={16} color={COLORS.SUCCESS} />
                    ) : (
                      <Badge variant="error" size="small">{day.violations}</Badge>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Exit Button */}
      <Button
        variant="outline"
        style={styles.exitButton}
        onPress={exitInspectionMode}
      >
        <Icon name="exit-to-app" size={20} color={COLORS.GRAY_600} />
        Exit Inspection Mode
      </Button>
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
  welcomeContent: {
    alignItems: 'center',
    gap: 24,
  },
  qrPlaceholder: {
    alignItems: 'center',
    padding: 20,
  },
  qrText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.GRAY_600,
    fontWeight: '500',
  },
  welcomeText: {
    alignItems: 'center',
    gap: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  welcomeDescription: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    lineHeight: 20,
  },
  activateButton: {
    width: '100%',
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  infoDescription: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    lineHeight: 16,
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  complianceItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
  },
  complianceLabel: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    marginBottom: 4,
    fontWeight: '500',
  },
  complianceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  activeHeader: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  activeHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  activeTime: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    marginTop: 2,
  },
  qrSection: {
    alignItems: 'center',
    gap: 16,
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.GRAY_300,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  qrOverlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
  },
  qrOverlaySubtext: {
    fontSize: 10,
    color: COLORS.GRAY_600,
    marginTop: 2,
  },
  qrInstruction: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    lineHeight: 20,
  },
  qrStats: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 8,
  },
  qrStat: {
    alignItems: 'center',
  },
  qrStatLabel: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    marginBottom: 2,
  },
  qrStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  transferMethods: {
    gap: 12,
  },
  transferButton: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    height: 60,
  },
  transferButtonText: {
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  transferMethodName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  transferMethodDesc: {
    fontSize: 12,
    color: COLORS.GRAY_600,
    marginTop: 2,
  },
  exportProgress: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
  },
  exportProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exportProgressText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_700,
  },
  exportProgressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  progressBar: {
    height: 6,
  },
  dataPreview: {
    gap: 16,
  },
  driverInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
  dataTable: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_300,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  tableCell: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    textAlign: 'center',
  },
  flex2: {
    flex: 2,
  },
  tableHeaderCell: {
    fontWeight: '600',
    color: COLORS.GRAY_700,
  },
  dateCell: {
    textAlign: 'left',
  },
  exitButton: {
    marginTop: 8,
  },
});