'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Layout from '@/components/Layout';
import FlightSegment from '@/components/TripDetail/FlightSegment';
import Header from '@/components/TripDetail/Header';
import Section from '@/components/TripDetail/Section';
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
    {
      id: 'leg-2',
      origin: { id: 'JFK', name: 'New York John F. Kennedy', displayCode: 'JFK', city: 'New York' },
      destination: { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London' },
      segments: [
        {
          id: 'segment-2',
          origin: { id: 'JFK', name: 'New York John F. Kennedy', displayCode: 'JFK', city: 'New York' },
          destination: { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London' },
          duration: 500,
          dayChange: 0,
          flightNumber: '2221',
          departure: '2025-08-12T13:00:00',
          arrival: '2025-08-12T23:20:00',
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
      duration: 500,
      stopCount: 0,
      departure: '2025-08-12T13:00:00',
      arrival: '2025-08-12T23:20:00',
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
          price: 2097.27,
          rating: { value: 4.2, count: 1200 },
          updateStatus: 'CURRENT',
          segments: [],
          isDirectDBookUrl: false,
          quoteAge: 3,
        },
      ],
      totalPrice: 2097.27,
    },
  ],
  isTransferRequired: false,
  destinationImage: 'https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg',
  operatingCarrierSafetyAttributes: [],
  flexibleTicketPolicies: [],
};

export default function RoundTripDetailPage() {
  const router = useRouter();
  const theme = useTheme();

  // In real app, fetch flight data based on IDs
  const departingFlight = mockFlightDetails;
  const returningFlight = mockFlightDetails;
  const totalPrice = departingFlight.pricingOptions[0].totalPrice + returningFlight.pricingOptions[0].totalPrice; // Mock calculation

  const handleBack = () => {
    router.back();
  };

  const formatPrice = (price: number) => {
    return `ARS ${price.toLocaleString()}`;
  };

  return (
    <Layout>
      <Box className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <Box className="mb-6">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            className="mb-4"
          >
            Back to search results
          </Button>
          
          <Header
            title="Round trip • Economy • 1 passenger"
            route={`${departingFlight.legs[0].origin.displayCode} ↔ ${departingFlight.legs[0].destination.displayCode}`}
            price={formatPrice(totalPrice)}
            subtitle="Lowest total price"
          />
        </Box>

        {/* Flight Details */}
        <Paper className="p-6 mb-6">
          <Box className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Selected flights
            </Typography>
            <Box className="flex items-center gap-2">
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Track prices
              </Typography>
            </Box>
          </Box>

          {/* Departing Flight */}
          <Section
            title={`Departing flight • ${departingFlight.legs[0].departure}`}
            subtitle={`${departingFlight.legs[0].departure} – ${departingFlight.legs[0].arrival} • ${departingFlight.legs[0].duration}`}
            carrier={departingFlight.legs[0].segments[0].marketingCarrier.name}
            defaultExpanded
          >
            {departingFlight.legs[0].segments.map(segment => (
              <FlightSegment key={segment.id} segment={segment} />
            ))}
          </Section>
          <Divider className="my-4" />
          {/* Returning Flight */}
          <Section
            title={`Returning flight • ${returningFlight.legs[1].departure}`}
            subtitle={`${returningFlight.legs[1].departure} – ${returningFlight.legs[1].arrival} • ${returningFlight.legs[1].duration}`}
            carrier={returningFlight.legs[1].segments[0].marketingCarrier.name}
          >
            {returningFlight.legs[1].segments.map(segment => (
              <FlightSegment key={segment.id} segment={segment} />
            ))}
          </Section>
        </Paper>

        {/* Action Buttons */}
        <Actions onBack={handleBack} />
      </Box>
    </Layout>
  );
} 