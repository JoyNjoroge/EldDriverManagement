export const HOS_LIMITS = {
  DRIVE: 11,      // 11 hours driving
  ON_DUTY: 14,    // 14 hours on duty
  CYCLE_7: 60,    // 60 hours in 7 days
  CYCLE_8: 70,    // 70 hours in 8 days
};

export const DUTY_STATUS = {
  OFF_DUTY: 'off-duty',
  SLEEPER: 'sleeper',
  DRIVING: 'driving',
  ON_DUTY: 'on-duty',
};


export const ALERT_TYPES = {
  HOS_WARNING: 'hos_warning',
  HOS_VIOLATION: 'hos_violation',
  CERTIFICATION_REQUIRED: 'certification_required',
  LOCATION_ISSUE: 'location_issue',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  HOS_DATA: 'hos_data',
  LOG_ENTRIES: 'log_entries',
  SETTINGS: 'settings',
};

export const COLORS = {
  OFF_DUTY: '#FFD700',    // Gold
  SLEEPER: '#8A2BE2',     // BlueViolet
  DRIVING: '#00BFFF',     // DeepSkyBlue
  ON_DUTY: '#32CD32',     // LimeGreen
};

export const DUTY_STATUS_CONFIG = {
  [DUTY_STATUS.OFF_DUTY]: {
    label: 'Off Duty',
    icon: 'clock-outline',
    color: COLORS.OFF_DUTY,
  },
  [DUTY_STATUS.SLEEPER]: {
    label: 'Sleeper Berth',
    icon: 'bed',
    color: COLORS.SLEEPER,
  },
  [DUTY_STATUS.DRIVING]: {
    label: 'Driving',
    icon: 'car',
    color: COLORS.DRIVING,
  },
  [DUTY_STATUS.ON_DUTY]: {
    label: 'On Duty',
    icon: 'check-circle',
    color: COLORS.ON_DUTY,
  },
};