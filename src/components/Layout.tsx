import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Box 
      className="min-h-screen flex flex-col"
      sx={{ 
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Header />
      <Container maxWidth="lg" className="flex-1 flex flex-col gap-6 py-8">
        <main className="flex-1 flex flex-col gap-6">{children}</main>
      </Container>
      <Box 
        component="footer"
        className="w-full py-4 text-center text-xs"
        sx={{ color: theme.palette.text.secondary }}
      >
        &copy; {new Date().getFullYear()} Google Flights Clone
      </Box>
    </Box>
  );
} 