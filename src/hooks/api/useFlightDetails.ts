import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FlightDetailsResponse } from '@/types/flight-api';

export const flightDetailsQueryKeys = {
  details: (params: FlightDetailsParams) => ['flights', 'details', params] as const,
};

export interface FlightDetailsParams {
  sessionId: string;
  legs: Array<{ origin: string; destination: string; date: string }>;
  adults: number;
  currency: string;
  locale: string;
  market: string;
  cabinClass: string;
  countryCode: string;
}

export function useFlightDetails(params: FlightDetailsParams) {
  return useQuery({
    queryKey: ['flightDetails', params],
    queryFn: async () => {
      const { data } = await axios.get<FlightDetailsResponse>(
        '/api/v1/flights/getFlightDetails',
        { params: {
          legs: JSON.stringify(params.legs),
          adults: params.adults,
          currency: params.currency,
          locale: params.locale,
          market: params.market,
          cabinClass: params.cabinClass,
          countryCode: params.countryCode,
        }}
      );
      return data.data;
    },
    enabled: !!params.sessionId && params.legs.length > 0,
    staleTime: 1000 * 60 * 10,
  });
} 