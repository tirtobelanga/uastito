import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');

        if (!name || !email) {
          ToastAndroid.show('User data not found', ToastAndroid.SHORT);
          return;
        }

        setUserData({
          name: name || '',
          email: email || '',
        });
      } catch (err) {
        console.log('Error fetching user data:', err);
        ToastAndroid.show('Failed to fetch user data', ToastAndroid.SHORT);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
      router.replace('/login');
    } catch (err) {
      console.log('Error during logout:', err);
      ToastAndroid.show('Failed to logout', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.sideLine}></View>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Home</Text>
        </View>

        <Text style={styles.subtitle}>Welcome, {userData.name}!</Text>

        {/* Konten Home */}
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>Your registered email: {userData.email}</Text>
          <Ionicons name="home-outline" size={60} color="#6A64E8" />
        </View>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F4FF',
  },
  sideLine: {
    width: 10,
    height: 150,
    backgroundColor: '#6C63FF',
    marginRight: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 92,
    color: '#6A64E8',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  contentBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6A64E8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
