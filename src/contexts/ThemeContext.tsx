
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorSchemeName, useColorScheme as useNativeColorScheme } from 'react-native';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useNativeColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme === 'light' ? 'light' : 'dark');

  // Effect to handle system theme changes
  useEffect(() => {
    const initialTheme = systemColorScheme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        setTheme: (newTheme: 'light' | 'dark') => setTheme(newTheme) 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
