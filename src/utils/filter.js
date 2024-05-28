import { Filters } from '../const';

const TripEmptyMessages = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no future events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.PAST]: 'There are no past events now',
};

const FilterFunctions = {
  [Filters.EVERYTHING]: () => true,
  [Filters.FUTURE]: (tripEvent) => tripEvent.dateFrom > new Date(),
  [Filters.PRESENT]: (tripEvent) => tripEvent.dateFrom <= new Date() && tripEvent.dateTo >= new Date(),
  [Filters.PAST]: (tripEvent) => tripEvent.dateTo < new Date(),
};

export { TripEmptyMessages, FilterFunctions };
