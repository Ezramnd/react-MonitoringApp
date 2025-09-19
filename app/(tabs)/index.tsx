import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getAlat } from '../../services/api';
import { useAuth } from '../../services/AuthContext';

// Definisikan tipe data untuk Alat agar lebih rapi
interface Alat {
  id: number;
  uuid: string;
  nama: string;
  jenis: string;
  lokasi: string;
  status: string;
}

export default function HomeScreen() {
  const [alatList, setAlatList] = useState<Alat[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAlat();
        setAlatList(response.data);
      } catch (err: any) {
        console.error("Gagal fetch data:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Alat Saya</Text>
        <Button title="Logout" onPress={logout} color="red" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={alatList}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* PERUBAHAN DI SINI: dari item.name menjadi item.nama */}
              <Text style={styles.itemName}>{item.nama}</Text>
              
              {/* Sekalian kita tampilkan info lain */}
              <Text style={styles.itemSubText}>Jenis: {item.jenis}</Text>
              <Text style={styles.itemSubText}>Lokasi: {item.lokasi}</Text>
              <Text style={styles.itemStatus}>Status: {item.status}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Anda belum memiliki alat.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubText: {
    fontSize: 14,
    color: '#555',
  },
  itemStatus: {
      fontSize: 14,
      color: 'green',
      marginTop: 5,
      fontWeight: 'bold'
  }
});