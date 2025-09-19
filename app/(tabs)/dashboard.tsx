import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardCard from '@/components/DashboardCard';
import { LineChart } from 'react-native-gifted-charts';

export default function DashboardScreen() {
  const [isIrrigationActive, setIsIrrigationActive] = useState(true);

  const dummyData = [
    { timestamp: '2025-09-02 11:00', suhu: 28.5, kelembaban: 65, cahaya: 55000, volume: 150 },
    { timestamp: '2025-09-02 10:00', suhu: 28.2, kelembaban: 66, cahaya: 52000, volume: 0 },
    { timestamp: '2025-09-02 09:00', suhu: 27.8, kelembaban: 68, cahaya: 48000, volume: 150 },
    { timestamp: '2025-09-01 17:00', suhu: 29.1, kelembaban: 62, cahaya: 35000, volume: 0 },
    { timestamp: '2025-09-01 16:00', suhu: 29.5, kelembaban: 60, cahaya: 42000, volume: 120 },
  ];

  const chartData = dummyData.map(item => ({
    value: item.suhu,
    label: item.timestamp.split(' ')[1], // Ambil jam-nya saja sebagai label
  })).reverse();

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.header}>Dashboard</Text> */}

      <View style={styles.cardRow}>
        <DashboardCard 
          title="Suhu" 
          value="28.5" 
          unit="°C" 
          iconName="thermometer-outline" 
          iconColor="#4dabf7" 
        />
        <DashboardCard 
          title="Kelembaban" 
          value="65" 
          unit="%" 
          iconName="water-outline" 
          iconColor="#74c0fc" 
        />
        <DashboardCard 
          title="Intensitas Cahaya" 
          value="55.000" 
          unit="Lux" 
          iconName="sunny-outline" 
          iconColor="#ffd43b" 
        />
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.cardTitle}>Status Irigasi</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: isIrrigationActive ? '#28a745' : '#dc3545' }]} />
              <Text style={styles.statusText}>{isIrrigationActive ? 'Aktif' : 'Mati'}</Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isIrrigationActive ? '#4dabf7' : '#f4f3f4'}
            onValueChange={() => setIsIrrigationActive(previousState => !previousState)}
            value={isIrrigationActive}
          />
        </View>
      </View>

      <View style={styles.graphCard}>
        <Text style={styles.graphTitle}>Grafik Sensor Real-time</Text>
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <LineChart
            data={chartData}
            height={200}
            width={280}
            // --- Styling Garis & Titik ---
            color="#0d6efd"
            thickness={3}
            dataPointsColor="#0d6efd"
            dataPointsRadius={5}
            // --- Styling Sumbu (Axis) ---
            yAxisLabelSuffix="°C"
            yAxisTextStyle={{ color: 'gray' }}
            xAxisLabelTextStyle={{ color: 'gray', height: 50 }}
            // --- Fitur Interaktif ---
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              pointerColor: 'lightgray',
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: false,
              pointerLabelComponent: (items: any) => {
                return (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipTime}>{items[0].label}</Text>
                    <Text style={styles.tooltipValue}>{items[0].value}°C</Text>
                  </View>
                );
              },
            }}
          />
        </View>
      </View>

      <View style={styles.dataCard}>
        <View style={styles.dataHeader}>
          <Text style={styles.graphTitle}>Data Green House</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download-outline" size={16} color="white" />
            <Text style={styles.buttonText}>Download CSV</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 2 }]}>TANGGAL & JAM</Text>
          <Text style={styles.headerText}>SUHU</Text>
          <Text style={styles.headerText}>KELEMBABAN</Text>
          <Text style={styles.headerText}>CAHAYA (LUX)</Text>
          <Text style={styles.headerText}>VOLUME IRIGASI</Text>
        </View>
        {dummyData.map((item, index) => {
          const [tanggal, jam] = item.timestamp.split(' ');
          return (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.cellText}>{tanggal}</Text>
                <Text style={styles.cellTextSubtle}>{jam}</Text>
              </View>
              <Text style={styles.cell}>{item.suhu}°C</Text>
              <Text style={styles.cell}>{item.kelembaban}%</Text>
              <Text style={styles.cell}>{item.cahaya / 1000}K</Text>
              <Text style={styles.cell}>{item.volume} mL</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 10,
    color: '#6c757d',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    margin: '1%',
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  graphCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  graphPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#6c757d',
  },
  dataCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    fontSize: 10,
    color: '#6c757d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: '#343a40',
  },
  cellText: {
    fontSize: 14,
    color: '#343a40',
  },
  cellTextSubtle: {
    fontSize: 12,
    color: '#6c757d',
  },
  tooltip: {
    height: 50,
    width: 80,
    backgroundColor: '#343a40',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tooltipTime: {
    color: 'white',
    fontSize: 12,
  },
  tooltipValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});