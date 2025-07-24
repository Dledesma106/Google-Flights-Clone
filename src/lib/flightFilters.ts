import countries from 'i18n-iso-countries';
import localeCodes from 'locale-codes';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Cabin classes
export const cabinClasses = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
];

// Sort by options
export const sortByOptions = [
  { value: 'best', label: 'Best' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'fastest', label: 'Fastest' },
];

// Currencies (static, can be trimmed)
export const currencies = [
  'USD', 'ARS', 'EUR', 'GBP', 'BRL', 'MXN', 'CAD', 'AUD', 'CLP', 'COP', 'UYU', 'PEN', 'BOB', 'PYG', 'CHF', 'JPY', 'CNY', 'INR', 'KRW', 'ZAR', 'TRY', 'RUB', 'SGD', 'HKD', 'NZD', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'ILS', 'AED', 'SAR', 'QAR', 'EGP', 'THB', 'MYR', 'IDR', 'PHP', 'TWD', 'VND', 'PKR', 'BDT', 'LKR', 'NGN', 'GHS', 'KES', 'TZS', 'UGX', 'MAD', 'DZD', 'TND', 'OMR', 'KWD', 'BHD', 'JOD', 'LBP', 'SDG', 'SYP', 'YER', 'AFN', 'MNT', 'KZT', 'UZS', 'AZN', 'GEL', 'AMD', 'BYN', 'UAH', 'MDL', 'RON', 'BGN', 'HRK', 'RSD', 'MKD', 'ALL', 'ISK', 'CZK', 'HUF', 'HRK', 'BAM', 'MZN', 'AOA', 'ZMW', 'MWK', 'BWP', 'NAD', 'SZL', 'LSL', 'SCR', 'MUR', 'MGA', 'KMF', 'DJF', 'SOS', 'SDG', 'SSP', 'ETB', 'ERN', 'SLL', 'GMD', 'GNF', 'CVE', 'XOF', 'XAF', 'XPF', 'CDF', 'BIF', 'RWF', 'MRO', 'MRU', 'GHS', 'SHP', 'FKP', 'GIP', 'JMD', 'TTD', 'BBD', 'BZD', 'KYD', 'BMD', 'BSD', 'ANG', 'AWG', 'SRD', 'GYD', 'HTG', 'DOP', 'XCD', 'XDR', 'TMT', 'KGS', 'TJS', 'IRR', 'IQD', 'LBP', 'SYP', 'JOD', 'ILS', 'OMR', 'YER', 'QAR', 'BHD', 'KWD', 'SAR', 'AED', 'PKR', 'AFN', 'BDT', 'NPR', 'LKR', 'MVR', 'BTN', 'INR', 'MMK', 'THB', 'LAK', 'KHR', 'VND', 'IDR', 'MYR', 'SGD', 'PHP', 'CNY', 'TWD', 'HKD', 'MOP', 'KRW', 'JPY', 'KPW', 'MNT', 'AUD', 'NZD', 'FJD', 'PGK', 'SBD', 'VUV', 'WST', 'TOP', 'TVD', 'KID', 'NIO', 'HNL', 'GTQ', 'PAB', 'CRC', 'SVC', 'PYG', 'BOB', 'BAM', 'MKD', 'MDL', 'ALL', 'RSD', 'HRK', 'BGN', 'RON', 'UAH', 'BYN', 'GEL', 'AZN', 'AMD', 'KZT', 'UZS', 'TMT', 'MZN', 'ZAR', 'NAD', 'SZL', 'LSL', 'BWP', 'MWK', 'ZMW', 'MUR', 'SCR', 'KMF', 'MGA', 'DJF', 'SOS', 'KES', 'TZS', 'UGX', 'RWF', 'BIF', 'CDF', 'XOF', 'XAF', 'XPF', 'STD', 'SLL', 'GMD', 'GNF', 'CVE', 'MRO', 'MRU', 'SHP', 'FKP', 'GIP', 'JMD', 'TTD', 'BBD', 'BZD', 'KYD', 'BMD', 'BSD', 'ANG', 'AWG', 'SRD', 'GYD', 'HTG', 'DOP', 'XCD', 'XDR'
];


// Country codes (ISO-2) with English names
export function getCountryOptions(locale: string = 'en') {
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames(locale, { select: 'official' });
  return Object.entries(countryObj).map(([code, name]) => ({ value: code, label: name }));
}

// Market/locales (e.g., en-US, es-AR)
export function getMarketOptions() {
  // Only return unique, valid locale codes
  const seen = new Set<string>();
  return localeCodes.all
    .filter(l => l.tag && !seen.has(l.tag) && seen.add(l.tag))
    .map(l => ({ value: l.tag, label: l.name ? `${l.name} (${l.tag})` : l.tag }));
} 