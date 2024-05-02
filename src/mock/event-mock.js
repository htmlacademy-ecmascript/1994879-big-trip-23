import { EVENT_TYPES } from '../const';
import { getId, getRandomArrayElement, getRandomBoolean, getRandomInt, getDateWithRandomTime } from './utils';
import { getRandomDestination } from './destination-mock';

const EVENTS_COUNT = 4;

const createMockEvent = () => {
  const { id: destinationId } = getRandomDestination();
  const dateStart = getDateWithRandomTime();
  const dateEnd = getDateWithRandomTime(dateStart);

  return {
    id: getId(),
    type: getRandomArrayElement(EVENT_TYPES),
    dateFrom: dateStart,
    dateTo: dateEnd,
    destination: destinationId,
    price: getRandomInt(100),
    isFavorite: getRandomBoolean(),
  };
};

const getMockedEvents = () => Array.from({ length: EVENTS_COUNT}, createMockEvent);

export { EVENTS_COUNT, getMockedEvents };
