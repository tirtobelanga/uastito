import React, { useState } from 'react'; 
// Mengimpor React dan useState dari 'react' untuk mengelola state lokal.

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid
} from 'react-native'; 
// Mengimpor komponen-komponen yang diperlukan dari 'react-native'.

import Ionicons from 'react-native-vector-icons/Ionicons'; 
// Mengimpor ikon dari 'react-native-vector-icons/Ionicons'.

import { router } from 'expo-router'; 
// Mengimpor router dari 'expo-router' untuk navigasi.

const { width } = Dimensions.get('window'); 
// Mendapatkan lebar layar dari dimensi perangkat.

const SignUpScreen = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  // Inisialisasi state untuk menyimpan input name, email, dan password.

  const login = () => {
    router.push('/login'); 
    // Fungsi untuk navigasi ke halaman login ketika tombol ditekan.
  };

  const signUp = () => {
    // Lakukan validasi jika diperlukan.
    router.push('/login'); 
    // Setelah mendaftar, diarahkan kembali ke halaman login.
  };

  return (
    <View style={styles.wrapper}> 
      {/* Membungkus seluruh konten halaman dengan gaya wrapper */}

      <View style={styles.sideLine}></View>
      {/* Garis di sisi kiri sebagai elemen dekoratif */}

      <View style={styles.container}> 
        {/* Kontainer utama untuk konten halaman */}

        <View style={styles.headerContainer}> 
          {/* Header yang berisi "Login" dan "Sign up" */}
          <Text style={styles.loginText} onPress={signUp}>Login</Text> 
          {/* Teks "Login" sebagai tombol navigasi */}
          <Text style={styles.title}>Sign up</Text> 
          {/* Teks "Sign up" dengan font besar */}
        </View>

        <View style={styles.subtitleContainer}> 
          {/* Subtitle yang menjelaskan instruksi pendaftaran */}
          <Text style={styles.subtitle}>Register your account now</Text>
        </View>

        <View style={styles.signUpBox}> 
          {/* Formulir untuk input pendaftaran */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Name" 
              value={name} 
              onChangeText={setName} 
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons name="person-outline" size={20} color="#8f8f8f" style={styles.icon} />
            {/* Input untuk memasukkan nama pengguna */}
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
            {/* Input untuk memasukkan email */}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry 
              placeholderTextColor="#B0B0B0"
            />
            <Ionicons name="lock-closed-outline" size={20} color="#8f8f8f" style={styles.icon} />
            {/* Input untuk memasukkan kata sandi */}
          </View>

          <TouchableOpacity style={styles.button} onPress={signUp}> 
            <Text style={styles.buttonText}>SIGN UP</Text> 
            {/* Tombol untuk melakukan pendaftaran */}
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or Register with</Text>
        {/* Teks yang menunjukkan alternatif pendaftaran lewat media sosial */}

        <View style={styles.socialContainer}> 
          {/* Kontainer untuk ikon media sosial */}
          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
          {/* Tombol pendaftaran menggunakan Google */}

          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/images/facebook.png')}
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
          {/* Tombol pendaftaran menggunakan Facebook */}

          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/images/twitter.png')}
                style={styles.socialIcon}
              />
            </View>
          </TouchableOpacity>
          {/* Tombol pendaftaran menggunakan Twitter */}
        </View>

        <View style={styles.loginContainer}> 
          {/* Kontainer untuk teks "Already have an account?" */}
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={login}>
            <Text style={styles.loginTextLink}>Login</Text>
          </TouchableOpacity>
          {/* Teks navigasi untuk mengarahkan ke halaman login */}
        </View>

        <View style={styles.termsContainer}> 
          {/* Teks yang menyatakan pengguna setuju dengan syarat dan ketentuan */}
          <Text style={styles.termsText}>By signing up, you agree with our</Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}> Terms & Conditions</Text>
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
    backgroundColor: '#F0F4FF', // Background halaman
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
    fontSize: 32, // Ukuran teks login
    color: '#A0A0A0',
  },
  title: {
    fontSize: 72, // Ukuran teks Sign Up
    color: '#6A64E8', // Warna biru keunguan
  },
  subtitleContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
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
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  termsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  termsText: {
    color: '#000',
    fontSize: 12,
  },
  termsLink: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});

export default SignUpScreen;
