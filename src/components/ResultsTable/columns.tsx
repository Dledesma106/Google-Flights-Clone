import { createColumnHelper } from '@tanstack/react-table';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  changeOfAirport?: boolean;
  price: number;
  currency: string;
  tripType: 'round trip' | 'one way';
};

const columnHelper = createColumnHelper<Flight>();

export const useFlightResultsTableColumns = () => {
  const theme = useTheme();
  
  return [
    columnHelper.accessor((row) => row, {
      id: 'airline',
      header: () => <span>Airline</span>,
      cell: (info) => {
        const flight = info.getValue();
        return (
          <Box className="flex items-start gap-3">
            {/* Airline Logo Placeholder */}
            <Box 
              className="w-8 h-8 rounded flex items-center justify-center"
              sx={{
                backgroundColor: theme.palette.action.hover,
              }}
            >
              <FlightTakeoffIcon 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '1rem',
                }} 
              />
            </Box>
            
            {/* Flight Times and Airline Info */}
            <Box className="flex flex-col">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {flight.departureTime} – {flight.arrivalTime}
                {flight.arrivalTime.includes('+') && (
                  <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    {flight.arrivalTime.split('+')[1]}
                  </span>
                )}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {flight.airline}
              </Typography>
            </Box>
          </Box>
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor((row) => row.duration, {
      id: 'duration',
      header: () => <span>Duration</span>,
      cell: (info) => (
        <Typography variant="body1">
          {info.getValue()}
        </Typography>
      ),
      enableSorting: true,
    }),

    columnHelper.accessor((row) => row, {
      id: 'stops',
      header: () => <span>Stops</span>,
      cell: (info) => {
        const flight = info.getValue();
        return (
          <Box className="flex flex-col">
            <Box className="flex items-center gap-1">
              <Typography variant="body1">
                {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
              </Typography>
              {flight.changeOfAirport && (
                <WarningIcon sx={{ color: theme.palette.error.main, fontSize: '1rem' }} />
              )}
            </Box>
            {flight.changeOfAirport && (
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Change of airport
              </Typography>
            )}
          </Box>
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor((row) => row, {
      id: 'airports',
      header: () => <span>Route</span>,
      cell: (info) => {
        const flight = info.getValue();
        return (
          <Typography variant="body1">
            {flight.departureAirport}-{flight.arrivalAirport}
          </Typography>
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor((row) => row, {
      id: 'price',
      header: () => <span>Price</span>,
      cell: (info) => {
        const flight = info.getValue();
        return (
          <Box className="flex flex-col items-end">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
              {flight.currency} {flight.price.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {flight.tripType}
            </Typography>
          </Box>
        );
      },
      enableSorting: true,
    }),

    columnHelper.display({
      id: 'actions',
      cell: () => (
        <Box className="flex items-center justify-end">
          <KeyboardArrowDownIcon sx={{ color: theme.palette.text.secondary }} />
        </Box>
      ),
    }),
  ];
}; 