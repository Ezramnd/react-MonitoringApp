// Di dalam file: app/(tabs)/dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import mqtt, { MqttClient } from 'mqtt'; // Import library mqtt

// Tipe data untuk informasi perangkat (agar lebih rapi)
interface DeviceInfo {
  ipAddress: string;
  chipId: string;
  firmware: string;
  ssid: string;
}

export default function DashboardScreen() {
  // State untuk menyimpan status koneksi
  const [connectionStatus, setConnectionStatus] = useState<string>('Mencoba menghubungkan...');
  // State untuk menyimpan data dari ESP32
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  
  useEffect(() => {
    // --- KONFIGURASI MQTT ---
    // Pastikan IP address ini sama dengan 'mqtt_server' di kode ESP32 Anda
    const MQTT_BROKER_URL = 'mqtt://192.168.1.23:9001'; 
    // Topik ini sama dengan MQTT_TOPIC_INFO di kode ESP32
    const MQTT_TOPIC_INFO = 'esp32/info';
    
    let client: MqttClient;

    try {
      // 1. Membuat koneksi ke Broker MQTT
      client = mqtt.connect(MQTT_BROKER_URL, {
        clientId: `react-native-client-${Math.random().toString(16).substr(2, 8)}`,
      });

      // 2. Mengatur event handler (apa yang terjadi saat terhubung, dapat pesan, dll)
      client.on('connect', () => {
        console.log('Terhubung ke MQTT Broker!');
        setConnectionStatus('Terhubung');
        // Setelah terhubung, langsung subscribe ke topik info dari ESP32
        client.subscribe(MQTT_TOPIC_INFO, (err) => {
          if (!err) {
            console.log(`Berhasil berlangganan ke topik: ${MQTT_TOPIC_INFO}`);
          } else {
            console.error('Gagal berlangganan:', err);
            setConnectionStatus('Gagal Subscribe');
          }
        });
      });

      client.on('message', (topic, message) => {
        // Pesan datang dalam bentuk buffer, kita ubah jadi string lalu JSON
        console.log(`Pesan diterima dari topik ${topic}: ${message.toString()}`);
        if (topic === MQTT_TOPIC_INFO) {
          try {
            const data = JSON.parse(message.toString());
            setDeviceInfo(data); // Simpan data ke state
          } catch (e) {
            console.error("Gagal parsing JSON dari MQTT:", e);
          }
        }
      });
      
      client.on('error', (err) => {
        console.error('Koneksi Error:', err);
        setConnectionStatus(`Error: ${err.message}`);
        client.end();
      });

      client.on('offline', () => {
        setConnectionStatus('Offline');
      });

    } catch (error) {
        console.error("Gagal membuat koneksi MQTT: ", error);
        setConnectionStatus('Gagal memulai koneksi');
    }

    // 3. Fungsi cleanup: akan dijalankan saat komponen di-unmount (pindah halaman)
    return () => {
      if (client) {
        console.log('Memutuskan koneksi MQTT...');
        client.end();
      }
    };
  }, []); // Array kosong artinya useEffect ini hanya berjalan sekali saat komponen dimuat

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard ESP32</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status Koneksi MQTT</Text>
        <Text style={styles.statusText}>{connectionStatus}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Perangkat</Text>
        {deviceInfo ? (
          <>
            <Text style={styles.infoLabel}>Alamat IP:</Text>
            <Text style={styles.infoValue}>{deviceInfo.ipAddress}</Text>
            
            <Text style={styles.infoLabel}>SSID WiFi:</Text>
            <Text style={styles.infoValue}>{deviceInfo.ssid}</Text>
            
            <Text style={styles.infoLabel}>MAC Address (Chip ID):</Text>
            <Text style={styles.infoValue}>{deviceInfo.chipId}</Text>
            
            <Text style={styles.infoLabel}>Versi Firmware:</Text>
            <Text style={styles.infoValue}>{deviceInfo.firmware}</Text>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
            <Text style={styles.loadingText}>Menunggu data dari ESP32...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// --- STYLING ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#102C57',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#343a40',
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6c757d',
  },
});
// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/two.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
