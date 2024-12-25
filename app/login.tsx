import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CApi from '@/lib/CApi';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const setVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
      return;
    }

    try {
      const request = {
        email: email,
        password: password,
      };

      const { data } = await CApi.post('/login', request, {
        headers: { 'Content-Type': 'text/plain' },
      });

      console.log('Login berhasil:', data);
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userEmail', data.data.email);
      await AsyncStorage.setItem('userName', data.data.name);

      ToastAndroid.show('Login successful!', ToastAndroid.SHORT);

      router.push('/dashboard');
    } catch (err) {
      console.log('Login gagal:', err);
      const msg = err?.response?.data?.message || 'Terjadi kesalahan';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  const handleRickRoll = () => {
    Linking.openURL('https://youtu.be/dQw4w9WgXcQ?si=1dMyymkSdafSk8kn');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.sideLine}></View>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Login</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Please login to your account.</Text>

        {/* Form Login */}
        <View style={styles.loginBox}>
          {/* Input Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons name="mail-outline" size={20} color="#8f8f8f" style={styles.icon} />
          </View>

          {/* Input Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#8f8f8f"
              style={styles.icon}
              onPress={setVisibility}
            />
          </View>

          {/* Tombol Login */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Sosial Media */}
        <Text style={styles.orText}>or login with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google Login')}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleRickRoll}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Twitter Login')}>
            <Image
              source={require('../assets/images/twitter.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Tautan Sign Up */}
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signUpText}>Create new now!</Text>
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
  signUp: {
    fontSize: 28,
    color: '#C0C0C0',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPassword: {
    color: '#000',
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
  signUpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  signUpText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
