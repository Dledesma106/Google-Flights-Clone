'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const cabinClasses = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
];
const currencies = ['USD', 'ARS', 'EUR'];
const markets = ['en-US', 'es-AR', 'pt-BR'];
const countryCodes = ['US', 'AR', 'BR'];
const sortByOptions = [
  { value: 'best', label: 'Best' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'fastest', label: 'Fastest' },
];

export default function FilterBar() {
  const [cabinClass, setCabinClass] = React.useState('economy');
  const [adults, setAdults] = React.useState(1);
  const [currency, setCurrency] = React.useState('USD');
  const [market, setMarket] = React.useState('en-US');
  const [countryCode, setCountryCode] = React.useState('US');
  const [sortBy, setSortBy] = React.useState('best');

  return (
    <Box className="w-full flex flex-wrap gap-4 items-center">
      {/* Cabin Class */}
      <FormControl size="small" className="min-w-[140px]">
        <InputLabel>Cabin Class</InputLabel>
        <Select value={cabinClass} label="Cabin Class" onChange={e => setCabinClass(e.target.value)}>
          {cabinClasses.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Adults */}
      <FormControl size="small" className="min-w-[120px]">
        <TextField
          label="Adults"
          type="number"
          size="small"
          value={adults}
          onChange={e => setAdults(Math.max(1, Number(e.target.value)))}
          slotProps={{ input: { style: { textAlign: 'center' } } }}
        />
      </FormControl>
      {/* Currency */}
      <FormControl size="small" className="min-w-[100px]">
        <InputLabel>Currency</InputLabel>
        <Select value={currency} label="Currency" onChange={e => setCurrency(e.target.value)}>
          {currencies.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Market/Language */}
      <FormControl size="small" className="min-w-[120px]">
        <InputLabel>Market</InputLabel>
        <Select value={market} label="Market" onChange={e => setMarket(e.target.value)}>
          {markets.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Country Code */}
      <FormControl size="small" className="min-w-[100px]">
        <InputLabel>Country</InputLabel>
        <Select value={countryCode} label="Country" onChange={e => setCountryCode(e.target.value)}>
          {countryCodes.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Sort By */}
      <FormControl size="small" className="min-w-[120px]">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={e => setSortBy(e.target.value)}>
          {sortByOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
} 