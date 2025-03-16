
import { Tabs } from 'expo-router';
import TabBar from '../../src/components/navigation/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <TabBar />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="incidents" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="messages/[id]" />
      <Tabs.Screen name="messages/index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
