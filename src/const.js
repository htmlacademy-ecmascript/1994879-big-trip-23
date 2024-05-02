const DEFAULT_EVENT_TYPE = 'Flight';

const BLANK_TRIP_EVENT = {
  type: DEFAULT_EVENT_TYPE,
  dateFrom: new Date(),
  dateTo: null,
  destination: null,
  price: 0,
  offers: [],
  isFavorite: false,
};

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DateFormats = {
  DATE_MONTH: 'MMM D',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'YY/MM/DD HH:mm',
  DAY: 'DD[d] HH[h] mm[m]',
  HOURS: 'HH[h] mm[m]',
  MINUTES: 'mm[m]'
};

export { BLANK_TRIP_EVENT, EVENT_TYPES, DateFormats };
