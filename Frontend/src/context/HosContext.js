import React, { createContext, useState, useContext, useEffect } from 'react';
import { HOS_LIMITS, DUTY_STATUS, DUTY_STATUS_CONFIG } from '../utils/constants';
import { formatHosTime } from '../utils/formatters';

const HosContext = createContext();

export const useHos = () => {
  const context = useContext(HosContext);
  if (!context) {
    throw new Error('useHos must be used within a HosProvider');
  }
  return context;
};

export const HosProvider = ({ children }) => {
  const [currentStatus, setCurrentStatus] = useState(DUTY_STATUS.OFF_DUTY);
  const [hosData, setHosData] = useState({
    drive: { current: 5.5, limit: HOS_LIMITS.DRIVE, remaining: 5.5 },
    onDuty: { current: 8, limit: HOS_LIMITS.ON_DUTY, remaining: 6 },
    cycle: { current: 45, limit: HOS_LIMITS.CYCLE_8, remaining: 25 },
  });
  const [alerts, setAlerts] = useState([]);
  const [location, setLocation] = useState(null);

  // Check for HOS violations and warnings
  useEffect(() => {
    checkHosAlerts();
  }, [hosData]);

  const checkHosAlerts = () => {
    const newAlerts = [];
    
    // Check drive time
    if (hosData.drive.current >= HOS_LIMITS.DRIVE - 1) {
      newAlerts.push({
        id: 'drive_warning',
        type: 'hos_warning',
        message: 'Approaching drive time limit',
        timeRemaining: formatHosTime(hosData.drive.remaining),
        severity: hosData.drive.current >= HOS_LIMITS.DRIVE ? 'violation' : 'warning',
      });
    }
    
    // Check on-duty time
    if (hosData.onDuty.current >= HOS_LIMITS.ON_DUTY - 1) {
      newAlerts.push({
        id: 'on_duty_warning',
        type: 'hos_warning',
        message: 'Approaching on-duty time limit',
        timeRemaining: formatHosTime(hosData.onDuty.remaining),
        severity: hosData.onDuty.current >= HOS_LIMITS.ON_DUTY ? 'violation' : 'warning',
      });
    }
    
    setAlerts(newAlerts);
  };

  const changeDutyStatus = (newStatus) => {
    setCurrentStatus(newStatus);
    
    // In a real app, this would sync with the backend
    // and update HOS calculations
    console.log(`Duty status changed to: ${DUTY_STATUS_CONFIG[newStatus].label}`);
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const getHosProgress = (type) => {
    const data = hosData[type];
    const percentage = (data.current / data.limit) * 100;
    
    let statusColor = '#28A745'; // Green
    if (percentage >= 90) statusColor = '#DC2626'; // Red
    else if (percentage >= 75) statusColor = '#FFC107'; // Yellow
    
    return {
      ...data,
      percentage,
      statusColor,
      formattedRemaining: formatHosTime(data.remaining),
    };
  };

  const value = {
    currentStatus,
    hosData,
    alerts,
    location,
    changeDutyStatus,
    updateLocation,
    getHosProgress,
  };

  return (
    <HosContext.Provider value={value}>
      {children}
    </HosContext.Provider>
  );
};

export default HosContext;