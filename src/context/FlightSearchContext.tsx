import React, { createContext, useContext, useState } from 'react';

export type FlightSearchState = {
  tripType: 'oneway' | 'roundtrip';
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  passengers: {
    adults: number;
    numChildren: number;
    infants: number;
  };
  cabinClass: string;
  currency: string;
  market: string;
  countryCode: string;
  sortBy: string;
};

export type FlightSearchContextType = FlightSearchState & {
  setTripType: (v: 'oneway' | 'roundtrip') => void;
  setOriginSkyId: (v: string) => void;
  setDestinationSkyId: (v: string) => void;
  setOriginEntityId: (v: string) => void;
  setDestinationEntityId: (v: string) => void;
  setDate: (v: string) => void;
  setReturnDate: (v: string) => void;
  setPassengers: (v: { adults: number; numChildren: number; infants: number }) => void;
  setCabinClass: (v: string) => void;
  setCurrency: (v: string) => void;
  setMarket: (v: string) => void;
  setCountryCode: (v: string) => void;
  setSortBy: (v: string) => void;
};

const defaultState: FlightSearchState = {
  tripType: 'roundtrip',
  originSkyId: '',
  destinationSkyId: '',
  originEntityId: '',
  destinationEntityId: '',
  date: '',
  returnDate: '',
  passengers: {
    adults: 1,
    numChildren: 0,
    infants: 0,
  },
  cabinClass: 'economy',
  currency: 'USD',
  market: 'en-US',
  countryCode: 'US',
  sortBy: 'best',
};

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export function FlightSearchProvider({ children }: { children: React.ReactNode }) {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>(defaultState.tripType);
  const [originSkyId, setOriginSkyId] = useState(defaultState.originSkyId);
  const [destinationSkyId, setDestinationSkyId] = useState(defaultState.destinationSkyId);
  const [originEntityId, setOriginEntityId] = useState(defaultState.originEntityId);
  const [destinationEntityId, setDestinationEntityId] = useState(defaultState.destinationEntityId);
  const [date, setDate] = useState(defaultState.date);
  const [returnDate, setReturnDate] = useState(defaultState.returnDate);
  const [passengers, setPassengers] = useState(defaultState.passengers);
  const [cabinClass, setCabinClass] = useState(defaultState.cabinClass);
  const [currency, setCurrency] = useState(defaultState.currency);
  const [market, setMarket] = useState(defaultState.market);
  const [countryCode, setCountryCode] = useState(defaultState.countryCode);
  const [sortBy, setSortBy] = useState(defaultState.sortBy);

  const value: FlightSearchContextType = {
    tripType, setTripType,
    originSkyId, setOriginSkyId,
    destinationSkyId, setDestinationSkyId,
    originEntityId, setOriginEntityId,
    destinationEntityId, setDestinationEntityId,
    date, setDate,
    returnDate, setReturnDate,
    passengers, setPassengers,
    cabinClass, setCabinClass,
    currency, setCurrency,
    market, setMarket,
    countryCode, setCountryCode,
    sortBy, setSortBy,
  };

  return (
    <FlightSearchContext.Provider value={value}>
      {children}
    </FlightSearchContext.Provider>
  );
}

export function useFlightSearch() {
  const ctx = useContext(FlightSearchContext);
  if (!ctx) throw new Error('useFlightSearch must be used within a FlightSearchProvider');
  return ctx;
} 