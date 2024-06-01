import { Filters } from '../../const';

const FilterFunctions = {
  [Filters.EVERYTHING]: () => true,
  [Filters.FUTURE]: (tripEvent) => tripEvent.dateFrom > new Date(),
  [Filters.PRESENT]: (tripEvent) => tripEvent.dateFrom <= new Date() && tripEvent.dateTo >= new Date(),
  [Filters.PAST]: (tripEvent) => tripEvent.dateTo < new Date(),
};

const getFiltered = (items, filterType) => items.filter(FilterFunctions[filterType]);

export { getFiltered };
