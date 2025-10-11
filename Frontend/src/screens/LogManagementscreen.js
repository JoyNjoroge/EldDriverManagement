import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import LogEntry from '../components/LogEntry';
// eslint-disable-next-line import/no-named-as-default
import COLORS from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock log data
const MOCK_LOG_ENTRIES = [
  {
    id: '1',
    date: '2024-12-26',
    startTime: '06:00',
    endTime: '10:00',
    status: 'driving',
    duration: '4h 0m',
    location: 'Atlanta, GA → Charlotte, NC',
    certified: true,
    annotation: 'Smooth driving conditions'
  },
  {
    id: '2',
    date: '2024-12-26',
    startTime: '10:00',
    endTime: '11:00',
    status: 'on-duty',
    duration: '1h 0m',
    location: 'Charlotte, NC - Fuel Stop',
    certified: true,
    annotation: 'Refueling and vehicle inspection'
  },
  {
    id: '3',
    date: '2024-12-26',
    startTime: '11:00',
    endTime: '21:00',
    status: 'sleeper',
    duration: '10h 0m',
    location: 'Charlotte, NC - Rest Area',
    certified: false,
    annotation: ''
  },
  {
    id: '4',
    date: '2024-12-25',
    startTime: '14:00',
    endTime: '22:00',
    status: 'driving',
    duration: '8h 0m',
    location: 'Jacksonville, FL → Atlanta, GA',
    certified: true,
    annotation: 'Heavy traffic near Jacksonville'
  },
  {
    id: '5',
    date: '2024-12-25',
    startTime: '08:00',
    endTime: '14:00',
    status: 'on-duty',
    duration: '6h 0m',
    location: 'Jacksonville, FL - Loading Dock',
    certified: true,
    annotation: 'Loading and paperwork'
  }
];

export default function LogManagementScreen() {
  const theme = useTheme();
  const [searchDate, setSearchDate] = useState('');
  const [logEntries, setLogEntries] = useState(MOCK_LOG_ENTRIES);
  const [editingLogId, setEditingLogId] = useState(null);
  const [newAnnotation, setNewAnnotation] = useState('');
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);

  const filteredLogs = logEntries.filter(entry => {
    const matchesSearch = !searchDate || entry.date.includes(searchDate);
    const matchesCertification = !showCertifiedOnly || entry.certified;
    return matchesSearch && matchesCertification;
  });

  const handleEditLog = (logId) => {
    const log = logEntries.find(entry => entry.id === logId);
    setEditingLogId(logId);
    setNewAnnotation(log.annotation || '');
  };

  const handleSaveAnnotation = (logId) => {
    if (!newAnnotation.trim()) {
      Alert.alert('Error', 'Please enter an annotation');
      return;
    }

    setLogEntries(prev => 
      prev.map(entry => 
        entry.id === logId 
          ? { ...entry, annotation: newAnnotation }
          : entry
      )
    );
    
    setEditingLogId(null);
    setNewAnnotation('');
    Alert.alert('Success', 'Annotation saved successfully');
  };

  const handleCertifyLog = (logId) => {
    Alert.alert(
      'Certify Log',
      'Are you sure you want to certify this log entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Certify', 
          onPress: () => {
            setLogEntries(prev => 
              prev.map(entry => 
                entry.id === logId 
                  ? { ...entry, certified: true }
                  : entry
              )
            );
            Alert.alert('Success', 'Log entry certified');
          }
        },
      ]
    );
  };

  const handleAddNewEntry = () => {
    Alert.alert(
      'New Log Entry',
      'This would open a form to create a new log entry with current location and time.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // In real app, this would navigate to log creation screen
            Alert.alert('Info', 'Log creation screen would open');
          }
        },
      ]
    );
  };

  const getStatusStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logEntries.filter(entry => entry.date === today);
    
    const stats = {
      total: todayLogs.length,
      driving: todayLogs.filter(entry => entry.status === 'driving').length,
      onDuty: todayLogs.filter(entry => entry.status === 'on-duty').length,
      sleeper: todayLogs.filter(entry => entry.status === 'sleeper').length,
      certified: todayLogs.filter(entry => entry.certified).length,
    };

    return stats;
  };

  const stats = getStatusStats();

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search and Filters */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <Text style={styles.cardTitleText}>Log Entries</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon name="calendar" size={20} color={COLORS.GRAY_500} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by date (YYYY-MM-DD)"
                  value={searchDate}
                  onChangeText={setSearchDate}
                  placeholderTextColor={COLORS.GRAY_500}
                />
                {searchDate ? (
                  <TouchableOpacity onPress={() => setSearchDate('')}>
                    <Icon name="close" size={20} color={COLORS.GRAY_500} />
                  </TouchableOpacity>
                ) : null}
              </View>
              
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    showCertifiedOnly && styles.filterButtonActive
                  ]}
                  onPress={() => setShowCertifiedOnly(!showCertifiedOnly)}
                >
                  <Icon 
                    name={showCertifiedOnly ? "check-circle" : "check-circle-outline"} 
                    size={16} 
                    color={showCertifiedOnly ? COLORS.WHITE : COLORS.PRIMARY} 
                  />
                  <Text style={[
                    styles.filterButtonText,
                    showCertifiedOnly && styles.filterButtonTextActive
                  ]}>
                    Certified Only
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Today's Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.DRIVING }]}>{stats.driving}</Text>
                <Text style={styles.statLabel}>Driving</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.ON_DUTY }]}>{stats.onDuty}</Text>
                <Text style={styles.statLabel}>On Duty</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: COLORS.SUCCESS }]}>{stats.certified}</Text>
                <Text style={styles.statLabel}>Certified</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Log Entries */}
        <View style={styles.logsContainer}>
          {filteredLogs.length === 0 ? (
            <Card style={styles.emptyCard}>
              <CardContent>
                <View style={styles.emptyContainer}>
                  <Icon name="text-box-search" size={48} color={COLORS.GRAY_400} />
                  <Text style={styles.emptyText}>No log entries found</Text>
                  <Text style={styles.emptySubtext}>
                    {searchDate ? 'Try searching with a different date' : 'Start by creating your first log entry'}
                  </Text>
                </View>
              </CardContent>
            </Card>
          ) : (
            filteredLogs.map((entry) => (
              <LogEntry
                key={entry.id}
                entry={entry}
                isEditing={editingLogId === entry.id}
                newAnnotation={newAnnotation}
                onEditAnnotation={setNewAnnotation}
                onEdit={() => handleEditLog(entry.id)}
                onSave={() => handleSaveAnnotation(entry.id)}
                onCancel={() => {
                  setEditingLogId(null);
                  setNewAnnotation('');
                }}
                onCertify={() => handleCertifyLog(entry.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Add New Entry FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddNewEntry}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={24} color={COLORS.WHITE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  searchContainer: {
    gap: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.GRAY_800,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.PRIMARY,
  },
  filterButtonTextActive: {
    color: COLORS.WHITE,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_200,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.GRAY_800,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.GRAY_600,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  logsContainer: {
    gap: 12,
  },
  emptyCard: {
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.GRAY_500,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});