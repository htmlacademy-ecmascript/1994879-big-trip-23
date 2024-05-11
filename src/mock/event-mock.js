import { EVENT_TYPES } from '../const';
import {
  getId,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInt,
  getDateWithRandomTime,
} from './utils';
import { getRandomDestination } from './destination-mock';
import { getMockedOffers } from './offer-mock';

const EVENTS_COUNT = 5;
const OFFERS_LIMIT = 3;

const mockedOffers = getMockedOffers();

const createMockEvent = () => {
  const { id: destinationId } = getRandomDestination();
  const type = getRandomArrayElement(EVENT_TYPES);
  const dateStart = getDateWithRandomTime();
  const dateEnd = getDateWithRandomTime(dateStart);
  const offersByType = mockedOffers.find((offer) => offer.type === type);
  const offers =
    offersByType.offers.length > 0
      ? Array.from({ length: getRandomInt(OFFERS_LIMIT) }, () => getRandomArrayElement(offersByType.offers))
      : [];
  const offerIds = offers.length > 0 ? offers.map((offer) => offer.id) : [];

  return {
    id: getId(),
    type: type,
    dateFrom: dateStart,
    dateTo: dateEnd,
    destination: destinationId,
    price: getRandomInt(100),
    isFavorite: getRandomBoolean(),
    offers: offerIds,
  };
};

const getMockedEvents = () =>
  Array.from({ length: EVENTS_COUNT }, createMockEvent);

export { EVENTS_COUNT, getMockedEvents };
