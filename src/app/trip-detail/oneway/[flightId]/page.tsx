'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

import Layout from '@/components/Layout';
import FlightSegment from '@/components/TripDetail/FlightSegment';
import Header from '@/components/TripDetail/Header';
import Actions from '@/components/TripDetail/Actions';

// Mock flight details data - in real app this would come from API
const mockFlightDetails = {
  legs: [
    {
      id: 'leg-1',
      origin: { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London' },
      destination: { id: 'JFK', name: 'New York John F. Kennedy', displayCode: 'JFK', city: 'New York' },
      segments: [
        {
          id: 'segment-1',
          origin: { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London' },
          destination: { id: 'JFK', name: 'New York John F. Kennedy', displayCode: 'JFK', city: 'New York' },
          duration: 484,
          dayChange: 0,
          flightNumber: '2220',
          departure: '2025-08-05T08:15:00',
          arrival: '2025-08-05T11:19:00',
          marketingCarrier: {
            id: '-32171',
            name: 'jetBlue',
            displayCode: 'B6',
            displayCodeType: 'IATA',
            logo: 'https://logos.skyscnr.com/images/airlines/favicon/B6.png',
            altId: 'B6',
          },
          operatingCarrier: {
            id: '-32171',
            name: 'jetBlue',
            displayCode: 'B6',
            displayCodeType: 'IATA',
            logo: 'https://logos.skyscnr.com/images/airlines/favicon/B6.png',
            altId: 'B6',
          },
        },
      ],
      duration: 484,
      stopCount: 0,
      departure: '2025-08-05T08:15:00',
      arrival: '2025-08-05T11:19:00',
      dayChange: 0,
    },
  ],
  pricingOptions: [
    {
      agents: [
        {
          id: 'expedia',
          name: 'Expedia',
          isCarrier: false,
          bookingProposition: 'PBOOK',
          url: 'https://www.expedia.com/',
          price: 1097.27,
          rating: { value: 4.2, count: 1200 },
          updateStatus: 'CURRENT',
          segments: [],
          isDirectDBookUrl: false,
          quoteAge: 3,
        },
      ],
      totalPrice: 1097.27,
    },
  ],
  isTransferRequired: false,
  destinationImage: 'https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg',
  operatingCarrierSafetyAttributes: [],
  flexibleTicketPolicies: [],
};

export default function OneWayTripDetailPage() {
  const router = useRouter();
  const theme = useTheme();

  // In real app, fetch flight data based on flightId
  const flight = mockFlightDetails;

  const handleBack = () => {
    router.back();
  };

  const formatPrice = (price: number) => {
    return `${flight.legs[0].segments[0].marketingCarrier.displayCode} ${price.toLocaleString()}`;
  };

  return (
    <Layout>
      <Box className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <Header
          title="One way • Economy • 1 passenger"
          route={`${flight.legs[0].origin.displayCode} → ${flight.legs[0].destination.displayCode}`}
          price={formatPrice(flight.pricingOptions[0].totalPrice)}
          subtitle="Lowest total price"
        />

        {/* Flight Details */}
        <Paper className="p-6 mb-6">
          <Box className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Selected flights
            </Typography>
            <Box className="flex items-center gap-2">
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {/* Emissions data is not available in mockFlightDetails, so we'll omit it */}
                Avg emissions
              </Typography>
              <InfoIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </Box>
          </Box>

          {/* Flight Segments */}
          {flight.legs[0].segments.map(segment => (
            <FlightSegment key={segment.id} segment={segment} />
          ))}
        </Paper>

        {/* Action Buttons */}
        <Actions onBack={handleBack} />
      </Box>
    </Layout>
  );
} 