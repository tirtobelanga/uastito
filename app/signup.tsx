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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CApi from '@/lib/CApi';

const { width } = Dimensions.get('window');

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State untuk menampilkan/samarkan password
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State untuk menampilkan/samarkan confirm password
  const router = useRouter();

  const setPasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle visibility password
  };

  const setConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible); // Toggle visibility confirm password
  };

  const handleSignUp = async () => {
    // Validasi input
    if (!name || !email || !password || !confirmPassword) {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }

    try {
      // Menyiapkan payload untuk API
      const payload = { name, email, password, confirm_password: confirmPassword };

      // Mengirim request ke API untuk registrasi
      const { data } = await CApi.post('/register', payload, {
        headers: { 'Content-Type': 'text/plain' },
      });

      // Menampilkan pesan sukses
      ToastAndroid.show('Register Success', ToastAndroid.SHORT);

      // Menyimpan token ke AsyncStorage jika tersedia
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        console.log('Token saved successfully.');
      }

      // Berpindah ke halaman login setelah registrasi berhasil
      router.replace('/login');
      console.log('Redirecting to login...');
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed. Please try again.';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.sideLine}></View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText} onPress={goToLogin}>
            Login
          </Text>
          <Text style={styles.title}>Sign up</Text>
        </View>

        <Text style={styles.subtitle}>Create your account</Text>

        <View style={styles.signUpBox}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons name="person-outline" size={20} color="#8f8f8f" style={styles.icon} />
          </View>
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
              onPress={setPasswordVisibility}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#8f8f8f"
              style={styles.icon}
              onPress={setConfirmPasswordVisibility}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or Register with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginTextLink}>Login</Text>
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
  loginText: {
    fontSize: 32,
    color: '#A0A0A0',
  },
  title: {
    fontSize: 72,
    color: '#6A64E8',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
    textAlign: 'right',
  },
  signUpBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderColor: '#000',
    borderWidth: 1.5,
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
    width: '100%',
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
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  loginTextLink: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
