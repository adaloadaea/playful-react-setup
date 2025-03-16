
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemedStatusBar() {
  const { theme } = useTheme();
  
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}
