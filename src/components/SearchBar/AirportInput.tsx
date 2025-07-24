'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { AirportSearchResult } from '@/types/flight-api';
import { useSearchAirports } from '@/hooks/api/useSearchAirports';

interface AirportInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  className?: string;
}

export default function AirportInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  className 
}: AirportInputProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const inputRef = React.useRef<HTMLDivElement>(null);

  // Search airports when input changes (now debounced)
  const { data: airportResponse, isLoading } = useSearchAirports(inputValue);
  const airports = airportResponse || [];

  // Update input value when prop changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    
    // If input is cleared, also clear the selected value
    if (!newValue) {
      onChange('');
    }
  };

  const handleAirportSelect = (airport: AirportSearchResult) => {
    const airportDisplay = airport.presentation.suggestionTitle;
    setInputValue(airportDisplay);
    onChange(airport.navigation.relevantFlightParams.skyId); // Pass the IATA code as the actual value
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (inputValue && airports.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => setIsOpen(false), 200);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box ref={inputRef} className={`relative ${className}`}>
      <TextField
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ),
          },
        }}
        className="rounded"
        size="small"
        fullWidth
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      />
      
      {/* Dropdown */}
      {isOpen && (inputValue.length >= 2) && (
        <Paper 
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto shadow-lg"
          elevation={3}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <List dense>
            {isLoading ? (
              <ListItem>
                <ListItemText 
                  primary="Searching airports..." 
                  sx={{ color: theme.palette.text.secondary }}
                />
              </ListItem>
            ) : airports.length > 0 ? (
              airports.map((airport) => (
                <ListItem key={airport.navigation.entityId} disablePadding>
                  <ListItemButton
                    onClick={() => handleAirportSelect(airport)}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {airport.presentation.suggestionTitle}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {airport.presentation.subtitle}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText 
                  primary="No airports found" 
                  sx={{ color: theme.palette.text.secondary }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
} 