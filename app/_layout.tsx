import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F0EB' } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="friends/[id]" />
          <Stack.Screen name="groups/[id]" />
          <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
          <Stack.Screen name="add-friend"  options={{ presentation: 'modal' }} />
          <Stack.Screen name="add-group"   options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
