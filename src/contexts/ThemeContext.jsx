import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or system preference
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      // Default to system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (error) {
      console.error('Error al leer la preferencia del tema:', error);
      return 'light';
    }
  });

  // Apply theme on mount and when theme changes
  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;
      
      // Remove all theme classes
      root.classList.remove('light', 'dark');
      body.classList.remove('light', 'dark');
      
      // Add current theme class
      root.classList.add(theme);
      body.classList.add(theme);
      
      // Set data-theme attribute
      root.setAttribute('data-theme', theme);
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Force update CSS variables
      const computedStyle = getComputedStyle(root);
      const bgColor = computedStyle.getPropertyValue('--color-bg').trim();
      const textColor = computedStyle.getPropertyValue('--color-text').trim();
      
      // Apply colors directly
      root.style.backgroundColor = bgColor;
      body.style.backgroundColor = bgColor;
      body.style.color = textColor;
      
      console.log('Tema aplicado:', { 
        theme,
        bgColor,
        textColor,
        rootClass: root.className,
        bodyClass: body.className
      });
      
    } catch (error) {
      console.error('Error al aplicar el tema:', error);
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Cambiando tema a:', newTheme);
      return newTheme;
    });
  }, []);
  
  // Create context value with memoization
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext as default };
