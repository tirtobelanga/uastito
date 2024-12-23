import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login'); // Pindah ke halaman login setelah 3 detik
    }, 3000);

    return () => clearTimeout(timer); // Membersihkan timer saat komponen di-unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subText}>Register your account now</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')} // Navigasi manual dengan tombol
      >
        <Text style={styles.buttonText}>Start our journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7ebf0',
  },
  welcomeText: {
    fontSize: 70,
    color: '#6C63FF',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#8f9093',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
