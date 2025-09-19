// Di dalam file: components/DashboardCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DashboardCardProps = {
  title: string;
  value: string;
  unit: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
};

const DashboardCard = ({ title, value, unit, iconName, iconColor }: DashboardCardProps) => {
  return (
    <View style={styles.card}>
      {/* --- Perubahan 1: Tambahkan View pembungkus ini --- */}
      <View style={styles.contentContainer}> 
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.cardValue}>{value}</Text>
          <Text style={styles.cardUnit}>{unit}</Text>
        </View>
      </View>
      {/* --------------------------------------------------- */}
      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
        <Ionicons name={iconName} size={14} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  // --- Perubahan 2: Tambahkan style untuk container baru ---
  contentContainer: {
    flex: 1, // Ini kunci utamanya!
    marginRight: 8, // Beri sedikit jarak ke ikon
  },
  // -----------------------------------------------------
  cardTitle: {
    fontSize: 10,
    color: '#6c757d',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  // --- Perubahan 3: Sesuaikan ukuran font ---
  cardValue: {
    fontSize: 18, // Sedikit diperkecil dari 28
    fontWeight: 'bold',
    color: '#343a40',
  },
  cardUnit: {
    fontSize: 10, // Sedikit diperkecil dari 16
    fontWeight: 'bold',
    color: '#343a40',
    marginLeft: 4,
  },
  // --------------------------------------------
  iconContainer: {
    padding: 7,
    borderRadius: 999,
  },
});

export default DashboardCard;