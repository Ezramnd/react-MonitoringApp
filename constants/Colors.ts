const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Monitoring dashboard colors
const monitoringColors = {
  // Green colors for positive/healthy status
  primaryGreen: '#2ecc71',
  darkGreen: '#27ae60',
  lightGreen: '#a3e4a3',
  
  // Red colors for alerts/critical status
  primaryRed: '#e74c3c',
  darkRed: '#c0392b',
  lightRed: '#f1aeae',
  
  // Supporting colors
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  border: '#ecf0f1',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  monitoring: monitoringColors,
};
