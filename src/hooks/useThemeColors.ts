
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

export const useThemeColors = () => {
  const { theme } = useTheme();
  return getThemeColors(theme);
};
