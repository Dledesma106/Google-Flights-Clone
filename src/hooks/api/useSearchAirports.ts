import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AirportSearchResponse } from '@/types/flight-api';

export const airportQueryKeys = {
  search: (query: string) => ['flights', 'airports', query] as const,
};

export function useSearchAirports(query: string) {
  return useQuery({
    queryKey: ['searchAirports', query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      const { data } = await axios.get<AirportSearchResponse>(
        `/api/v1/flights/searchAirport`,
        { params: { query } }
      );
      return data.data;
    },
    enabled: !!query && query.length >= 2,
    staleTime: 1000 * 60 * 10,
  });
} 