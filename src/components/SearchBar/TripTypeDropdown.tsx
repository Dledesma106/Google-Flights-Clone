'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type TripTypeOption = { value: string; label: string; icon: React.ReactNode };

export default function TripTypeDropdown({ value, onChange, options }: {
  value: string;
  onChange: (value: string) => void;
  options: TripTypeOption[];
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const selected = options.find(o => o.value === value);
  return (
    <>
      <Button
        variant="text"
        onClick={e => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon />}
        className="capitalize text-lg"
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        <span className="mr-2">{selected?.icon}</span>
        {selected?.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => { onChange(option.value); setAnchorEl(null); }}
          >
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
} 