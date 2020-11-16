import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';

import { lightColors, darkColors } from './colorThemes';

export const ThemeContext = React.createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState(useColorScheme());
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');

  // Listening to changes of device appearance while in run-time
  /* React.useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]); */

  React.useEffect(() => {
    setColorScheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: scheme => setIsDark(scheme === 'dark'),
  };

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);
