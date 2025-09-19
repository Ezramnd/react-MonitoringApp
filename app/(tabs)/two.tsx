import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { Text, View } from '@/components/Themed';
import DashboardHeader from '@/components/DashboardHeader';
import MonitoringCard from '@/components/MonitoringCard';
import Colors from '@/constants/Colors';

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Mock detailed monitoring data
  const alertsData = [
    {
      title: 'High CPU Usage',
      value: 'Critical',
      subtitle: 'Server-01 at 89%',
      iconName: 'exclamation-circle' as const,
      status: 'error' as const,
    },
    {
      title: 'Low Disk Space',
      value: 'Warning',
      subtitle: 'Database server 85% full',
      iconName: 'hdd-o' as const,
      status: 'warning' as const,
    },
    {
      title: 'SSL Certificate',
      value: 'Expiring',
      subtitle: 'Expires in 7 days',
      iconName: 'certificate' as const,
      status: 'warning' as const,
    },
  ];

  const servicesData = [
    {
      title: 'Web Server',
      value: 'Healthy',
      subtitle: 'Nginx - Port 80/443',
      iconName: 'globe' as const,
      status: 'success' as const,
    },
    {
      title: 'API Gateway',
      value: 'Healthy',
      subtitle: 'Response time: 45ms',
      iconName: 'exchange' as const,
      status: 'success' as const,
    },
    {
      title: 'Load Balancer',
      value: 'Healthy',
      subtitle: '3 instances active',
      iconName: 'balance-scale' as const,
      status: 'success' as const,
    },
    {
      title: 'Cache Server',
      value: 'Degraded',
      subtitle: 'Redis - High memory usage',
      iconName: 'bolt' as const,
      status: 'warning' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <DashboardHeader 
        title="System Details"
        subtitle="Alerts and service status"
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>
          <View style={styles.cardsContainer}>
            {alertsData.map((item, index) => (
              <MonitoringCard
                key={`alert-${index}`}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                iconName={item.iconName}
                status={item.status}
                onPress={() => console.log(`Alert: ${item.title}`)}
              />
            ))}
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Status</Text>
          <View style={styles.cardsContainer}>
            {servicesData.map((item, index) => (
              <MonitoringCard
                key={`service-${index}`}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                iconName={item.iconName}
                status={item.status}
                onPress={() => console.log(`Service: ${item.title}`)}
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
  section: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.monitoring.textPrimary,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardsContainer: {
    backgroundColor: 'transparent',
  },
});
