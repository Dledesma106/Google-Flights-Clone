// Airport Search
export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: AirportSearchResult[];
}

export interface AirportSearchResult {
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

// Flight Search
export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  data: {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: FlightItinerary[];
  };
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: unknown;
  fareAttributes: unknown;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FlightLeg {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  segments: FlightSegment[];
}

export interface FlightPlace {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted?: boolean;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface FlightSegment {
  id: string;
  origin: FlightSegmentPlace;
  destination: FlightSegmentPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
  transportMode: string;
}

export interface FlightSegmentPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
}

// Flight Details
export interface FlightDetailsResponse {
  status: boolean;
  timestamp: number;
  data: {
    itinerary: {
      legs: FlightDetailsLeg[];
      pricingOptions: FlightDetailsPricingOption[];
      isTransferRequired: boolean;
      destinationImage: string;
      operatingCarrierSafetyAttributes: unknown[];
      flexibleTicketPolicies: unknown[];
    };
    pollingCompleted: boolean;
  };
}

export interface FlightDetailsLeg {
  id: string;
  origin: FlightDetailsPlace;
  destination: FlightDetailsPlace;
  segments: FlightDetailsSegment[];
  duration: number;
  stopCount: number;
  departure: string;
  arrival: string;
  dayChange: number;
}

export interface FlightDetailsPlace {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface FlightDetailsSegment {
  id: string;
  origin: FlightDetailsPlace;
  destination: FlightDetailsPlace;
  duration: number;
  dayChange: number;
  flightNumber: string;
  departure: string;
  arrival: string;
  marketingCarrier: FlightDetailsCarrier;
  operatingCarrier: FlightDetailsCarrier;
}

export interface FlightDetailsCarrier {
  id: string;
  name: string;
  displayCode: string;
  displayCodeType: string;
  logo: string;
  altId: string;
}

export interface FlightDetailsPricingOption {
  agents: FlightDetailsAgent[];
  totalPrice: number;
}

export interface FlightDetailsAgent {
  id: string;
  name: string;
  isCarrier: boolean;
  bookingProposition: string;
  url: string;
  price: number;
  rating: {
    value: number;
    count: number;
  };
  updateStatus: string;
  segments: FlightDetailsSegment[];
  isDirectDBookUrl: boolean;
  quoteAge: number;
} 