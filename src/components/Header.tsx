import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useDarkMode } from '@/context/DarkModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      component="header"
      className="w-full shadow-sm py-4 px-6 flex items-center justify-between"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        className="text-2xl font-bold"
        sx={{ color: theme.palette.primary.main }}
        onClick={() => router.push('/')}
      >
        Google Flights Clone
      </Box>
      
      <Box className="flex items-center">
        <IconButton
          onClick={toggleDarkMode}
          color="inherit"
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
} 