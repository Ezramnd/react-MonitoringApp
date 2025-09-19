import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { Text, View } from '@/components/Themed';
import DashboardHeader from '@/components/DashboardHeader';
import MonitoringCard from '@/components/MonitoringCard';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Mock monitoring data
  const monitoringData = [
    {
      title: 'Server Status',
      value: 'Online',
      subtitle: 'Last checked: 2 min ago',
      iconName: 'server' as const,
      status: 'success' as const,
    },
    {
      title: 'System Load',
      value: '23%',
      subtitle: 'CPU Usage',
      iconName: 'tachometer' as const,
      status: 'success' as const,
    },
    {
      title: 'Memory Usage',
      value: '67%',
      subtitle: '5.4GB / 8GB',
      iconName: 'microchip' as const,
      status: 'warning' as const,
    },
    {
      title: 'Active Alerts',
      value: '3',
      subtitle: '2 Critical, 1 Warning',
      iconName: 'exclamation-triangle' as const,
      status: 'error' as const,
    },
    {
      title: 'Network Traffic',
      value: '45 Mbps',
      subtitle: 'Inbound/Outbound',
      iconName: 'wifi' as const,
      status: 'success' as const,
    },
    {
      title: 'Database Status',
      value: 'Connected',
      subtitle: 'Response time: 12ms',
      iconName: 'database' as const,
      status: 'success' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <DashboardHeader 
        title="Monitoring Dashboard"
        subtitle="Real-time system monitoring"
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>System Metrics</Text>
          
          <View style={styles.cardsGrid}>
            {monitoringData.map((item, index) => (
              <MonitoringCard
                key={index}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                iconName={item.iconName}
                status={item.status}
                onPress={() => console.log(`Pressed ${item.title}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.monitoring.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  metricsContainer: {
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.monitoring.textPrimary,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardsGrid: {
    backgroundColor: 'transparent',
  },
});
