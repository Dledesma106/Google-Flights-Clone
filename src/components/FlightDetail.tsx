import * as React from 'react';

type Flight = {
  id: number;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
};

export default function FlightDetail({ flight, children }: { flight: Flight; children?: React.ReactNode }) {
  return (
    <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700">
      <h2 className="text-lg font-semibold mb-2">Flight Details</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <div><strong>Airline:</strong> {flight.airline}</div>
          <div><strong>Departure:</strong> {flight.departure}</div>
          <div><strong>Arrival:</strong> {flight.arrival}</div>
          <div><strong>Duration:</strong> {flight.duration}</div>
          <div><strong>Stops:</strong> {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</div>
          <div><strong>Price:</strong> ${flight.price}</div>
        </div>
        {children && <div className="flex-1">{children}</div>}
      </div>
    </div>
  );
} 