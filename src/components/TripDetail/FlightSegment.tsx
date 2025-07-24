import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useTheme } from '@mui/material/styles';
import { FlightDetailsSegment } from '@/types/flight-api';

export default function FlightSegment({ segment }: { segment: FlightDetailsSegment }) {
  const theme = useTheme();
  return (
    <Box className="mb-4">
      <Box className="flex items-start gap-4">
        <Box 
          className="w-10 h-10 rounded flex items-center justify-center"
          sx={{ backgroundColor: theme.palette.action.hover }}
        >
          <FlightTakeoffIcon sx={{ color: theme.palette.text.secondary }} />
        </Box>
        <Box className="flex-1">
          <Box className="flex items-center justify-between mb-2">
            <Typography variant="h6" className="font-semibold">
              {new Date(segment.departure).toLocaleTimeString()} – {new Date(segment.arrival).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {Math.floor(Number(segment.duration) / 60)} hr {Number(segment.duration) % 60} min
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }} className="mb-1">
            {segment.origin.displayCode} ({segment.origin.name})
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }} className="mb-2">
            {segment.destination.displayCode} ({segment.destination.name})
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {segment.marketingCarrier.altId} • {segment.marketingCarrier.name} • {segment.flightNumber}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 