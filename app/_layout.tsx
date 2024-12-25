import { Stack } from "expo-router";
import store from '../store'
import { Provider } from 'react-redux'

// export const unstable_settings = {
//   initialRouteName: "account",
// };

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack initialRouteName="account">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="dahsboard" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

