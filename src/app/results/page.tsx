'use client';

import * as React from 'react';
import ResultsTable from '@/components/ResultsTable';
import FullSearchBar from '@/components/SearchBar/FullSearchBar';
import Layout from '@/components/Layout';
import { FlightSearchParams, useSearchFlights } from '@/hooks/api/useSearchFlights';
import { FlightSearchProvider, useFlightSearch } from '@/context/FlightSearchContext';

function ResultsPageInner() {
  const {
    tripType, originSkyId, destinationSkyId, originEntityId, destinationEntityId, date, returnDate, passengers,
    cabinClass, currency, market, countryCode, sortBy
  } = useFlightSearch();

  // Search trigger
  const [searchParams, setSearchParams] = React.useState<FlightSearchParams>({
    originSkyId: '',
    destinationSkyId: '',
    originEntityId: '',
    destinationEntityId: '',
    date: '',
    returnDate: undefined,
    adults: 1,
  });

  // Handler to trigger search
  const handleSearch = () => {
    setSearchParams({
      originSkyId: originSkyId,
      destinationSkyId: destinationSkyId,
      originEntityId: originEntityId,
      destinationEntityId: destinationEntityId,
      date: date,
      returnDate: tripType === 'roundtrip' ? returnDate : undefined,
      adults: passengers.adults,
      children: passengers.numChildren,
      infants: passengers.infants,
      cabinClass,
      currency,
      countryCode,
      market,
      sortBy,
    });
  };

  const { data: flights, isLoading, isFetching, error } = useSearchFlights(searchParams);

  // Optionally, auto-search on mount or when all required fields are filled
  React.useEffect(() => {
    if (originSkyId && destinationSkyId && date) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <FullSearchBar />
        <div className="mt-8">
          {isLoading || isFetching ? (
            <div className="text-center py-8 text-lg">Searching flights...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading flights.</div>
          ) : (
            <ResultsTable flights={flights?.itineraries} tripType={tripType} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default function ResultsPage() {
  return (
    <FlightSearchProvider>
      <ResultsPageInner />
    </FlightSearchProvider>
  );
} 