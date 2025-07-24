'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type CabinClassOption = { value: string; label: string };

export default function CabinClassDropdown({ value, onChange, options }: {
  value: string;
  onChange: (value: string) => void;
  options: CabinClassOption[];
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
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
} 