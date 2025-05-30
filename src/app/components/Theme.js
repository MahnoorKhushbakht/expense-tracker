'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/theme';


export default function Theme({children}) {
  const [theme, setTheme] = useState('dark');

  const lightTheme = () => {
    localStorage.theme = 'light';
    setTheme('light');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  };

  const darkTheme = () => {
    localStorage.theme = 'dark';
    setTheme('dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);


  return(
 <ThemeProvider value={{ theme, lightTheme, darkTheme }}>
  {children}
 </ThemeProvider>
  )

}