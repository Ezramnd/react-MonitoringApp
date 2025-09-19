import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// PENTING: Gunakan alamat IP lokal komputer Anda, bukan 'localhost'.
// Port-nya sesuaikan dengan server Express Anda (yaitu 5000).
const API_BASE_URL = 'http://192.168.1.22:5000'; // <-- GANTI DENGAN IP ANDA

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Ini bagian "ajaib"-nya: Interceptor
// Kode ini akan berjalan SEBELUM setiap request dikirim.
// Tujuannya adalah untuk mengambil token dari penyimpanan dan menempelkannya
// secara otomatis ke header Authorization.
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

// --- Fungsi-fungsi API berdasarkan routes Anda ---

// Fungsi untuk Login
export const loginUser = (data: any) => {
  return apiClient.post('/login', data);
};

// Fungsi untuk mendapatkan data user yang sedang login ('/me')
export const getMe = () => {
    return apiClient.get('/me');
};

// Fungsi untuk mendapatkan daftar alat ('/alat')
export const getAlat = () => {
  return apiClient.get('/alat');
};

// Fungsi untuk mendapatkan semua jadwal ('/jadwal')
export const getSemuaJadwal = () => {
    return apiClient.get('/jadwal');
}

// Fungsi untuk membuat jadwal baru untuk alat tertentu
export const createJadwalUntukAlat = (deviceId: string, data: any) => {
    return apiClient.post(`/alat/${deviceId}/jadwal`, data);
}

// Anda bisa tambahkan fungsi-fungsi lain di sini sesuai kebutuhan
// seperti createDevice, deleteDevice, dll.