import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FlightSearchResponse } from '@/types/flight-api';

export const flightSearchQueryKeys = {
  search: (params: FlightSearchParams) => ['flights', 'search', params] as const,
};

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults: number;
  children?: number;
  infants?: number;
  sortBy?: string;
  limit?: number;
  carriersIds?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export function useSearchFlights(params: FlightSearchParams) {
  return useQuery({
    queryKey: ['searchFlights', params],
    queryFn: async () => {
      const { data } = await axios.get<FlightSearchResponse>(
        '/api/v2/flights/searchFlights',
        { params }
      );
      return data.data;
    },
    enabled: !!params.originSkyId && !!params.destinationSkyId && !!params.date,
    staleTime: 1000 * 60 * 10,
  });
} 