import { Filters, SortTypes } from '../const';
import { getDateDiff } from './date';

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

const SortFunctions = {
  [SortTypes.DAY]: (eventA, eventB) => eventA.dateFrom - eventB.dateFrom,
  [SortTypes.TIME]: (eventA, eventB) => getDateDiff(eventB) - getDateDiff(eventA),
  [SortTypes.PRICE]: (eventA, eventB) => eventB.basePrice - eventA.basePrice,
};

export { TripEmptyMessages, FilterFunctions, SortFunctions };
