'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useFlightResultsTableColumns, Flight } from './columns';
import { FlightItinerary } from '@/types/flight-api';

// --- MOCK DATA FOR DEMO/DEV ---
const mockItineraries: FlightItinerary[] = [
  {
    id: 'itinerary-1',
    price: {
      raw: 1097.27,
      formatted: '$1,098',
      pricingOptionId: 'zrtv-aLAndwf',
    },
    legs: [
      {
        id: 'leg-1',
        origin: {
          id: 'LHR',
          entityId: '95565050',
          name: 'London Heathrow',
          displayCode: 'LHR',
          city: 'London',
          country: 'United Kingdom',
        },
        destination: {
          id: 'JFK',
          entityId: '95565058',
          name: 'New York John F. Kennedy',
          displayCode: 'JFK',
          city: 'New York',
          country: 'United States',
        },
        durationInMinutes: 484,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-08-05T08:15:00',
        arrival: '2025-08-05T11:19:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            { id: -32171, alternateId: 'B6', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/B6.png', name: 'jetBlue' },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: 'segment-1',
            origin: {
              flightPlaceId: 'LHR', displayCode: 'LHR', parent: { flightPlaceId: 'LOND', displayCode: 'LON', name: 'London', type: 'City' }, name: 'London Heathrow', type: 'Airport', country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'JFK', displayCode: 'JFK', parent: { flightPlaceId: 'NYCA', displayCode: 'NYC', name: 'New York', type: 'City' }, name: 'New York John F. Kennedy', type: 'Airport', country: 'United States',
            },
            departure: '2025-08-05T08:15:00',
            arrival: '2025-08-05T11:19:00',
            durationInMinutes: 484,
            flightNumber: '2220',
            marketingCarrier: { id: -32171, alternateId: 'B6', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/B6.png', name: 'jetBlue' },
            operatingCarrier: { id: -32171, alternateId: 'B6', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/B6.png', name: 'jetBlue' },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {},
    fareAttributes: {},
    tags: ['shortest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.999,
  },
  {
    id: 'itinerary-2',
    price: {
      raw: 850.50,
      formatted: '$851',
      pricingOptionId: 'abc123',
    },
    legs: [
      {
        id: 'leg-2',
        origin: {
          id: 'LGW', entityId: '95565051', name: 'London Gatwick', displayCode: 'LGW', city: 'London', country: 'United Kingdom',
        },
        destination: {
          id: 'JFK', entityId: '95565058', name: 'New York John F. Kennedy', displayCode: 'JFK', city: 'New York', country: 'United States',
        },
        durationInMinutes: 715,
        stopCount: 1,
        isSmallestStops: false,
        departure: '2025-08-05T15:05:00',
        arrival: '2025-08-05T22:00:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            { id: -32013, alternateId: 'DY', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/DY.png', name: 'Norwegian' },
            { id: -30667, alternateId: '9~', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/9%7E.png', name: 'Norse Atlantic Airways' },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: 'segment-2a',
            origin: {
              flightPlaceId: 'LGW', displayCode: 'LGW', parent: { flightPlaceId: 'LOND', displayCode: 'LON', name: 'London', type: 'City' }, name: 'London Gatwick', type: 'Airport', country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'OSL', displayCode: 'OSL', parent: { flightPlaceId: 'OSLO', displayCode: 'OSL', name: 'Oslo', type: 'City' }, name: 'Oslo Gardermoen', type: 'Airport', country: 'Norway',
            },
            departure: '2025-08-05T15:05:00',
            arrival: '2025-08-05T18:10:00',
            durationInMinutes: 125,
            flightNumber: '1307',
            marketingCarrier: { id: -32013, alternateId: 'DY', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/DY.png', name: 'Norwegian' },
            operatingCarrier: { id: -32013, alternateId: 'DY', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/DY.png', name: 'Norwegian' },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
          {
            id: 'segment-2b',
            origin: {
              flightPlaceId: 'OSL', displayCode: 'OSL', parent: { flightPlaceId: 'OSLO', displayCode: 'OSL', name: 'Oslo', type: 'City' }, name: 'Oslo Gardermoen', type: 'Airport', country: 'Norway',
            },
            destination: {
              flightPlaceId: 'JFK', displayCode: 'JFK', parent: { flightPlaceId: 'NYCA', displayCode: 'NYC', name: 'New York', type: 'City' }, name: 'New York John F. Kennedy', type: 'Airport', country: 'United States',
            },
            departure: '2025-08-05T20:05:00',
            arrival: '2025-08-05T22:00:00',
            durationInMinutes: 475,
            flightNumber: '1',
            marketingCarrier: { id: -30667, alternateId: '9~', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/9%7E.png', name: 'Norse Atlantic Airways' },
            operatingCarrier: { id: -30667, alternateId: '9~', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/9%7E.png', name: 'Norse Atlantic Airways' },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: true,
    isProtectedSelfTransfer: false,
    farePolicy: {},
    fareAttributes: {},
    tags: ['cheapest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.8335,
  },
  {
    id: 'itinerary-3',
    price: {
      raw: 1205.00,
      formatted: '$1,205',
      pricingOptionId: 'def456',
    },
    legs: [
      {
        id: 'leg-3',
        origin: {
          id: 'LHR', entityId: '95565050', name: 'London Heathrow', displayCode: 'LHR', city: 'London', country: 'United Kingdom',
        },
        destination: {
          id: 'EWR', entityId: '95565059', name: 'New York Newark', displayCode: 'EWR', city: 'New York', country: 'United States',
        },
        durationInMinutes: 600,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2025-08-06T09:00:00',
        arrival: '2025-08-06T14:00:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            { id: -32222, alternateId: 'IB', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/IB.png', name: 'Iberia' },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: 'segment-3',
            origin: {
              flightPlaceId: 'LHR', displayCode: 'LHR', parent: { flightPlaceId: 'LOND', displayCode: 'LON', name: 'London', type: 'City' }, name: 'London Heathrow', type: 'Airport', country: 'United Kingdom',
            },
            destination: {
              flightPlaceId: 'EWR', displayCode: 'EWR', parent: { flightPlaceId: 'NYCA', displayCode: 'NYC', name: 'New York', type: 'City' }, name: 'New York Newark', type: 'Airport', country: 'United States',
            },
            departure: '2025-08-06T09:00:00',
            arrival: '2025-08-06T14:00:00',
            durationInMinutes: 600,
            flightNumber: 'IB123',
            marketingCarrier: { id: -32222, alternateId: 'IB', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/IB.png', name: 'Iberia' },
            operatingCarrier: { id: -32222, alternateId: 'IB', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/IB.png', name: 'Iberia' },
            transportMode: 'TRANSPORT_MODE_FLIGHT',
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {},
    fareAttributes: {},
    tags: ['direct'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.91,
  },
];
// --- END MOCK DATA ---

type TripType = 'oneway' | 'roundtrip';

type Props = {
  flights?: FlightItinerary[];
  tripType?: TripType;
  onFlightSelect?: (flight: Flight) => void;
};

// Helper to map API result to table row
function mapItineraryToFlight(itinerary: FlightItinerary, tripType: TripType = 'roundtrip'): Flight {
  // Use the first leg for one-way, or both for roundtrip
  const leg = itinerary.legs[0];
  return {
    id: itinerary.id,
    airline: leg.carriers.marketing.map(c => c.name).join(', '),
    airlineCode: leg.carriers.marketing.map(c => c.alternateId).join(', '),
    departureTime: formatTime(leg.departure),
    arrivalTime: formatTime(leg.arrival),
    departureAirport: leg.origin.displayCode,
    arrivalAirport: leg.destination.displayCode,
    duration: formatDuration(leg.durationInMinutes),
    stops: leg.stopCount,
    changeOfAirport: false, // Not available in API
    price: itinerary.price.raw,
    currency: itinerary.price.formatted.replace(/[^A-Z$€£¥]+.*/, ''),
    tripType: tripType === 'oneway' ? 'one way' : 'round trip',
  };
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hr${h !== 1 ? 's' : ''} ${m} min`;
}

export default function ResultsTable({ flights, tripType = 'roundtrip', onFlightSelect }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedFlightId, setSelectedFlightId] = React.useState<string | null>(null);
  const [selectedDepartingFlight, setSelectedDepartingFlight] = React.useState<Flight | null>(null);
  const [currentView, setCurrentView] = React.useState<'departing' | 'returning'>('departing');
  
  const columns = useFlightResultsTableColumns();

  // Map API results to table format
  const mappedFlights = React.useMemo(() => {
    const data = flights && flights.length > 0 ? flights : mockItineraries;
    return data.map(f => mapItineraryToFlight(f, tripType));
  }, [flights, tripType]);

  const table = useReactTable({
    data: mappedFlights,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlightId(flight.id);
    
    if (tripType === 'oneway') {
      router.push(`/trip-detail/oneway/${flight.id}`);
    } else {
      if (currentView === 'departing') {
        setSelectedDepartingFlight(flight);
        setCurrentView('returning');
        setSelectedFlightId(null);
      } else {
        router.push(`/trip-detail/roundtrip/${selectedDepartingFlight?.id}/${flight.id}`);
      }
    }
    onFlightSelect?.(flight);
  };

  const handleBackToDeparting = () => {
    setCurrentView('departing');
    setSelectedDepartingFlight(null);
    setSelectedFlightId(null);
  };

  return (
    <Box className="w-full">
      {/* Title and Back Button */}
      <Box className="mb-4 flex items-center gap-4">
        {tripType === 'roundtrip' && currentView === 'returning' && (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToDeparting}
            size="small"
          >
            Back to departing flights
          </Button>
        )}
        <Typography variant="h5" className="font-semibold">
          {tripType === 'oneway' ? 'Departing flights' : currentView === 'departing' ? 'Departing flights' : 'Returning flights'}
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer 
        component={Paper} 
        className="overflow-hidden rounded-lg shadow-sm"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Table>
          <TableHead>
            <TableRow 
              sx={{
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[100],
              }}
            >
              {table.getHeaderGroups()[0].headers.map(header => (
                <TableCell
                  key={header.id}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    fontWeight: 600,
                  }}
                  onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <span className="ml-1">
                      {header.column.getIsSorted() === 'asc' ? ' ▲' : header.column.getIsSorted() === 'desc' ? ' ▼' : ''}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              const flight = row.original;
              const isSelected = selectedFlightId === flight.id;
              
              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={isSelected}
                  onClick={() => handleFlightSelect(flight)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: isSelected 
                      ? theme.palette.primary.main + '20' 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: isSelected 
                        ? theme.palette.primary.main + '30'
                        : theme.palette.action.hover,
                    },
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell 
                      key={cell.id}
                      sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        paddingY: 2,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 