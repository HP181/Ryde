import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (<SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" backgroundColor="white"  />
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  </SafeAreaView>
  );
}

export default Layout;
