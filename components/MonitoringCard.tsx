import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';

interface MonitoringCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  status: 'success' | 'warning' | 'error' | 'info';
  onPress?: () => void;
}

export default function MonitoringCard({
  title,
  value,
  subtitle,
  iconName,
  status,
  onPress,
}: MonitoringCardProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'success':
        return {
          backgroundColor: Colors.monitoring.primaryGreen,
          iconColor: '#ffffff',
          textColor: '#ffffff',
        };
      case 'error':
        return {
          backgroundColor: Colors.monitoring.primaryRed,
          iconColor: '#ffffff',
          textColor: '#ffffff',
        };
      case 'warning':
        return {
          backgroundColor: '#f39c12',
          iconColor: '#ffffff',
          textColor: '#ffffff',
        };
      case 'info':
      default:
        return {
          backgroundColor: Colors.monitoring.cardBackground,
          iconColor: Colors.monitoring.textPrimary,
          textColor: Colors.monitoring.textPrimary,
        };
    }
  };

  const statusColors = getStatusColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: statusColors.backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.cardContent, { backgroundColor: 'transparent' }]}>
        <View style={[styles.header, { backgroundColor: 'transparent' }]}>
          <FontAwesome
            name={iconName}
            size={24}
            color={statusColors.iconColor}
            style={styles.icon}
          />
          <Text style={[styles.title, { color: statusColors.textColor }]}>
            {title}
          </Text>
        </View>
        
        <Text style={[styles.value, { color: statusColors.textColor }]}>
          {value}
        </Text>
        
        {subtitle && (
          <Text style={[styles.subtitle, { color: statusColors.textColor, opacity: 0.8 }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: Colors.monitoring.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
});