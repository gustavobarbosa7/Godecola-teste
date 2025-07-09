import { useMemo, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useLocalStorage('isDark', prefersDarkMode);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, [setIsDark]);

  const value = useMemo(() => ({
    isDark,
    toggleTheme,
  }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={isDark ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
