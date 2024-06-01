import { SortTypes } from '../../const';
import { getDateDiff } from '../../utils/date';

const SortFunctions = {
  [SortTypes.DAY]: (eventA, eventB) => eventA.dateFrom - eventB.dateFrom,
  [SortTypes.TIME]: (eventA, eventB) => getDateDiff(eventB) - getDateDiff(eventA),
  [SortTypes.PRICE]: (eventA, eventB) => eventB.basePrice - eventA.basePrice,
};

const getSorted = (items, sortType) => items.sort(SortFunctions[sortType]);

export { getSorted };
