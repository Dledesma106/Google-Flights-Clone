'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';

const queryClient = new QueryClient();

function ThemedApp({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          background: {
            default: isDarkMode ? '#0a0a0a' : '#ffffff',
            paper: isDarkMode ? '#1a1a1a' : '#ffffff',
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <ThemedApp>
        {children}
      </ThemedApp>
    </DarkModeProvider>
  );
} 