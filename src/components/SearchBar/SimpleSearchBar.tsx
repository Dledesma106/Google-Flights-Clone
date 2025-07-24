'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import TripTypeDropdown, { TripTypeOption } from './TripTypeDropdown';
import PassengersDropdown from './PassengersDropdown';
import CabinClassDropdown from './CabinClassDropdown';
import AirportInput from './AirportInput';
import { cabinClasses } from '@/lib/flightFilters';
import DateInput from './DateInput';

const tripTypes: TripTypeOption[] = [
  { value: 'oneway', label: 'One way', icon: <>&#8594;</> },
  { value: 'roundtrip', label: 'Round trip', icon: <>&#8646;</> },
];
const defaultPassengers = { adults: 1, numChildren: 0, infants: 0 };

export default function SimpleSearchBar({ onSearch }: { onSearch?: () => void }) {
  const theme = useTheme();
  const [tripType, setTripType] = React.useState<'oneway' | 'roundtrip'>('oneway');
  const [departDate, setDepartDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [passengers, setPassengers] = React.useState({ ...defaultPassengers });
  const [cabinClass, setCabinClass] = React.useState('economy');
  const totalPassengers = passengers.adults + passengers.numChildren + passengers.infants;

  return (
    <Box className="w-full min-h-[60vh] flex flex-col items-center justify-center py-12">
      <Box 
        className="md:rounded-3xl md:shadow-2xl p-4 md:p-10 flex flex-col gap-8 w-full max-w-5xl items-center"
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: {
            md: `1px solid ${theme.palette.divider}`,
            sm: 'none'
          }
        }}
      >
        <Box className="flex flex-row gap-4 w-full items-center justify-start">
          <TripTypeDropdown value={tripType} onChange={v => setTripType(v as 'oneway' | 'roundtrip')} options={tripTypes} />
          <PassengersDropdown value={passengers} onChange={setPassengers} totalPassengers={totalPassengers} />
          <CabinClassDropdown value={cabinClass} onChange={setCabinClass} options={cabinClasses} />
        </Box>
        <Box className="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
          <Box className="flex gap-4 w-full mx-4 md:mx-0">
            <AirportInput
                label="From"
                placeholder="City or airport"
                value={origin}
                onChange={setOrigin}
                icon={<FlightTakeoffIcon />}
                className="flex-1"
            />
            <AirportInput
                label="To"
                placeholder="City or airport"
                value={destination}
                onChange={setDestination}
                icon={<FlightLandIcon />}
                className="flex-1"
            />
          </Box>
          <Box className="flex gap-4 w-full mx-4 md:mx-0">
            {tripType === 'oneway' ? (
              <DateInput
                label="Depart Date"
                value={departDate}
                onChange={setDepartDate}
                className="rounded text-lg"
              />
            ) : (
              <>
                <DateInput
                  label="Depart Date"
                  value={departDate}
                  onChange={setDepartDate}
                  className="rounded text-lg"
                />
                <DateInput
                  label="Return Date"
                  value={returnDate}
                  onChange={setReturnDate}
                  className="rounded text-lg"
                />
              </>
            )}
          </Box>
        </Box>
        <Box className="w-full flex justify-center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="min-w-[180px] text-lg py-3"
            onClick={onSearch}
          >
            Search flights
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 