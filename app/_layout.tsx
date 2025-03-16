
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import ThemedStatusBar from '../src/components/ThemedStatusBar';

export default function RootLayout() {
  // This effect will run once when the app starts
  useEffect(() => {
    // Redirect to login screen when the app starts
    router.replace('/(auth)/login');
  }, []);

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="message/[id]" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen
          name="messages/[id]"
          options={{
            presentation: 'modal',
            animation: 'slide_from_right'
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
