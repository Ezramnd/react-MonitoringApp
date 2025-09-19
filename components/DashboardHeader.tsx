import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <FontAwesome
          name="tachometer"
          size={32}
          color={Colors.monitoring.primaryGreen}
          style={styles.titleIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={styles.statusIndicator}>
        <View style={[styles.statusDot, { backgroundColor: Colors.monitoring.primaryGreen }]} />
        <Text style={styles.statusText}>System Online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.monitoring.background,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.monitoring.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.monitoring.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.monitoring.textSecondary,
    marginTop: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: Colors.monitoring.textSecondary,
    fontWeight: '500',
  },
});