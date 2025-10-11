import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge.js';
import COLORS from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DUTY_STATUS_CONFIG } from '../utils/constants.js';

export default function LogEntry({ 
  entry, 
  isEditing, 
  newAnnotation, 
  onEditAnnotation, 
  onEdit, 
  onSave, 
  onCancel, 
  onCertify 
}) {
  const statusConfig = DUTY_STATUS_CONFIG[entry.status] || DUTY_STATUS_CONFIG['off-duty'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'driving': return COLORS.DRIVING;
      case 'on-duty': return COLORS.ON_DUTY;
      case 'sleeper': return COLORS.SLEEPER;
      default: return COLORS.OFF_DUTY;
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'driving': return 'primary';
      case 'on-duty': return 'error';
      case 'sleeper': return 'success';
      default: return 'outline';
    }
  };

  return (
    <Card style={[
      styles.card,
      !entry.certified && styles.uncertifiedCard
    ]}>
      <CardContent style={styles.cardContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon 
              name={statusConfig.icon} 
              size={20} 
              color={getStatusColor(entry.status)} 
            />
            <View style={styles.headerText}>
              <View style={styles.titleRow}>
                <Text style={styles.dateText}>{entry.date}</Text>
                <Badge variant={getStatusBadgeVariant(entry.status)} size="small">
                  {statusConfig.label}
                </Badge>
                {entry.certified ? (
                  <Icon name="check-circle" size={16} color={COLORS.SUCCESS} />
                ) : (
                  <Badge variant="warning" size="small">
                    Pending
                  </Badge>
                )}
              </View>
              <Text style={styles.timeText}>
                {entry.startTime} - {entry.endTime} ({entry.duration})
              </Text>
            </View>
          </View>
          
          {!isEditing && (
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Icon name="pencil" size={18} color={COLORS.GRAY_600} />
            </TouchableOpacity>
          )}
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={14} color={COLORS.GRAY_500} />
          <Text style={styles.locationText}>{entry.location}</Text>
        </View>

        {/* Annotation */}
        {entry.annotation ? (
          <View style={styles.annotationContainer}>
            <Text style={styles.annotationLabel}>Note:</Text>
            <Text style={styles.annotationText}>{entry.annotation}</Text>
          </View>
        ) : null}

        {/* Editing Mode */}
        {isEditing && (
          <View style={styles.editingContainer}>
            <Text style={styles.editingLabel}>Add/Edit Annotation</Text>
            <View style={styles.annotationInputContainer}>
              <TextInput
                style={styles.annotationInput}
                value={newAnnotation}
                onChangeText={onEditAnnotation}
                placeholder="Enter notes or corrections..."
                placeholderTextColor={COLORS.GRAY_400}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.voiceButton}>
                <Icon name="microphone" size={18} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.editingActions}>
              <Button 
                variant="outline" 
                size="small" 
                onPress={onCancel}
                style={styles.actionButton}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="small" 
                onPress={onSave}
                style={styles.actionButton}
              >
                Save
              </Button>
              {!entry.certified && (
                <Button 
                  variant="secondary" 
                  size="small" 
                  onPress={onCertify}
                  style={styles.actionButton}
                >
                  <Icon name="check-circle" size={16} color={COLORS.SUCCESS} />
                  Certify
                </Button>
              )}
            </View>
          </View>
        )}

        {/* Quick Actions when not editing */}
        {!isEditing && !entry.certified && (
          <View style={styles.quickActions}>
            <Button 
              variant="outline" 
              size="small" 
              onPress={onEdit}
              style={styles.quickActionButton}
            >
              <Icon name="pencil" size={14} color={COLORS.PRIMARY} />
              Edit
            </Button>
            <Button 
              variant="secondary" 
              size="small" 
              onPress={onCertify}
              style={styles.quickActionButton}
            >
              <Icon name="check-circle" size={14} color={COLORS.SUCCESS} />
              Certify
            </Button>
          </View>
        )}
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 0,
  },
  uncertifiedCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.WARNING,
    backgroundColor: '#FFFBEB',
  },
  cardContent: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  headerText: {
    marginLeft: 8,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.GRAY_600,
  },
  editButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.GRAY_700,
    marginLeft: 4,
    flex: 1,
  },
  annotationContainer: {
    backgroundColor: COLORS.GRAY_100,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  annotationLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginBottom: 2,
  },
  annotationText: {
    fontSize: 12,
    color: COLORS.GRAY_700,
    lineHeight: 16,
  },
  editingContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_200,
    paddingTop: 12,
    marginTop: 8,
  },
  editingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginBottom: 8,
  },
  annotationInputContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  annotationInput: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    borderRadius: 6,
    padding: 12,
    paddingRight: 40,
    fontSize: 14,
    color: COLORS.GRAY_800,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  voiceButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  editingActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flex: 1,
    minWidth: 80,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  quickActionButton: {
    flex: 1,
  },
});