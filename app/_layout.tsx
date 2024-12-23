import { Stack } from "expo-router";
import store from '../store'
import { Provider } from 'react-redux'
export default function RootLayout() {
  return (
    <Stack>
      {/* Halaman Index */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Halaman Login */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      
      {/* Halaman Signup */}
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      
      {/* Halaman Home */}
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
