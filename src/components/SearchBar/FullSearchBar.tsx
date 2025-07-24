import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TripTypeDropdown, { TripTypeOption } from './TripTypeDropdown';
import PassengersDropdown from './PassengersDropdown';
import CabinClassDropdown from './CabinClassDropdown';
import AirportInput from './AirportInput';
import DateInput from './DateInput';
import { cabinClasses, sortByOptions, currencies, getCountryOptions, getMarketOptions } from '@/lib/flightFilters';
import { useFlightSearch } from '@/context/FlightSearchContext';

const tripTypes: TripTypeOption[] = [
  { value: 'oneway', label: 'One way', icon: <>&#8594;</> },
  { value: 'roundtrip', label: 'Round trip', icon: <>&#8646;</> },
];

export default function FullSearchBar() {
  const theme = useTheme();
  const {
    tripType, setTripType,
    originSkyId, setOriginSkyId,
    destinationSkyId, setDestinationSkyId,
    date, setDate,
    returnDate, setReturnDate,
    passengers, setPassengers,
    cabinClass, setCabinClass,
    currency, setCurrency,
    market, setMarket,
    countryCode, setCountryCode,
    sortBy, setSortBy,
  } = useFlightSearch();

  const totalPassengers = passengers.adults + passengers.numChildren + passengers.infants;

  // Get country and market options from utility
  const countryOptions = React.useMemo(() => getCountryOptions('en'), []);
  const marketOptions = React.useMemo(() => getMarketOptions(), []);

  const handleTripTypeChange = (value: string) => setTripType(value as 'oneway' | 'roundtrip');

  return (
    <Box 
      className="w-full"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box className="w-full p-6 flex flex-col gap-4">
        <Box className="flex items-center gap-2 mb-2">
          <TripTypeDropdown
            value={tripType}
            onChange={handleTripTypeChange}
            options={tripTypes}
          />
          <PassengersDropdown
            value={passengers}
            onChange={setPassengers}
            totalPassengers={totalPassengers}
          />
          <CabinClassDropdown
            value={cabinClass}
            onChange={setCabinClass}
            options={cabinClasses}
          />
        </Box>
        <Box className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <Box className="flex gap-4 w-full mx-4 md:mx-0">
            <AirportInput
                label="From"
                placeholder="City or airport"
                value={originSkyId}
                onChange={setOriginSkyId}
                icon={<FlightTakeoffIcon />}
                className="flex-1"
            />
            <AirportInput
                label="To"
                placeholder="City or airport"
                value={destinationSkyId}
                onChange={setDestinationSkyId}
                icon={<FlightLandIcon />}
                className="flex-1"
            />
          </Box>
          <Box className="flex gap-4 w-full mx-4 md:mx-0">
            {tripType === 'oneway' ? (
              <DateInput
                label="Depart Date"
                value={date}
                onChange={setDate}
                className="rounded text-lg"
              />
            ) : (
              <>
                <DateInput
                  label="Depart Date"
                  value={date}
                  onChange={setDate}
                  className="rounded text-lg"
                />
                <DateInput
                  label="Return Date"
                  value={returnDate || ''}
                  onChange={setReturnDate}
                  className="rounded text-lg"
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box 
        className="w-full px-6 pb-4"
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box className="w-full flex flex-wrap gap-4 items-center pt-4">
          <FormControl size="small" className="min-w-[100px]">
            <InputLabel>Currency</InputLabel>
            <Select value={currency} label="Currency" onChange={e => setCurrency(e.target.value)}>
              {currencies.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" className="min-w-[160px]">
            <InputLabel>Market</InputLabel>
            <Select value={market} label="Market" onChange={e => setMarket(e.target.value)}>
              {marketOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" className="min-w-[140px]">
            <InputLabel>Country</InputLabel>
            <Select value={countryCode} label="Country" onChange={e => setCountryCode(e.target.value)}>
              {countryOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" className="min-w-[120px]">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={e => setSortBy(e.target.value)}>
              {sortByOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
} 