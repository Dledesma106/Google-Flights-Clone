# Google Flights Clone

A responsive application inspired by Google Flights, built with Next.js, Material UI, Tailwind CSS, React Query, and React Table.

## Project Description

This project is a technical challenge to create a responsive Google Flights-like experience using React and the Sky Scrapper API from RapidAPI. The focus is on flight search functionality, with a clean, modern UI and robust filtering and sorting options.
This project is incomplete, and since I started by mocking up the UI, and later started integrating the API, all of it has mock data. The API has only 20 request per month on the Free tier, so I couldn't test it properly, but I was able to extract types from the few requests I made by hand on the RapidApi Website

## Tech Stack
- Next.js (App Router, TypeScript)
- Material UI (component library)
- Tailwind CSS (utility-first styling)
- React Query (API state management)
- React Table (advanced table features)

## Scope & Decisions
- **Flight Search Only:** Only the flight search feature is implemented. Other Google Flights features (hotels, vacation rentals, etc.) are out of scope.
- **Persistent Search & Filter Bars:** The search bar and filter bar are always visible at the top of the page.
- **Results Area:** The main content area displays either:
  - A table/list of found flights (with pagination, filtering, sorting, etc.)
  - Or, if a flight is selected, a detail view for that flight, with a table of alternative flights between the selected locations.
- **Trip Detail Pages:** Dedicated pages for both one-way and roundtrip flight details, showing all segments for the selected itinerary, with a modular, component-based structure.

## API & Endpoints Used
This project uses the [Sky Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper) from RapidAPI for all flight and airport data:

- **Search Airports**
  - `GET /api/v1/flights/searchAirport`
  - Used for airport/city autocomplete in the search bar.
  - Returns a list of matching airports and cities with their codes and metadata.

- **Search Flights**
  - `GET /api/v2/flights/searchFlights`
  - Used to search for available flights between two locations, with filters for date, cabin class, passengers, etc.
  - Returns a list of itineraries, each with price, legs, segments, and carrier info.

- **Get Flight Details**
  - `GET /api/v1/flights/getFlightDetails`
  - Used to fetch detailed information for a selected itinerary (for trip detail pages).
  - Returns all legs and segments, with carrier, times, and booking options.

## Getting Started
1. Clone the repo
2. Install dependencies with `yarn`
3. Run the dev server with `yarn dev`

## License
MIT
