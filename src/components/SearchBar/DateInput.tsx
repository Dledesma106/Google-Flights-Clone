import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTheme } from '@mui/material/styles';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function DateInput({ label, value, onChange, className }: DateInputProps) {
  const theme = useTheme();
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          )
        },
        inputLabel: {
            shrink: true,
        }
      }}
      className={className}
      size="small"
      fullWidth
      sx={{ backgroundColor: theme.palette.background.default }}
    />
  );
} 