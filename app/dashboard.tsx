import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      if (name && email) {
        setUserName(name);
        setUserEmail(email);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userEmail');

    // Tampilkan pop-up logout sukses
    ToastAndroid.show('Logout berhasil!', ToastAndroid.SHORT);

    // Arahkan ke halaman login setelah menampilkan toast
    router.push('/login');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.sideLine}></View>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome, {userName}</Text>
        </View>

        {/* Dashboard Content */}
        <Text style={styles.subtitle}>Your Dashboard</Text>

        <View style={styles.dashboardBox}>
          <Text style={styles.userInfo}>Email: {userEmail}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>

        {/* Social Links (optional) */}
        <Text style={styles.orText}>or connect with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text>Need help? </Text>
          <TouchableOpacity onPress={() => router.push('/support')}>
            <Text style={styles.footerLink}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: Math.min(width * 0.2, 36),
    color: '#6A64E8',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  dashboardBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A64E8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    color: '#A0A0A0',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  footerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  footerLink: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default DashboardScreen;
