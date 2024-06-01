import { isEmpty } from '../../utils/common';
import { getTypedOffers, getDestination, getOffer } from './common';

const getDestinationName = (destinations, destinationId) => {
  const currentDestination = getDestination(destinations, destinationId);
  return currentDestination ? currentDestination.name : '';
};

const getOfferCost = (tripEvent, offers) => {
  const typedOffers = getTypedOffers(offers, tripEvent.type).offers;
  return tripEvent.offers.reduce((price, offerId) => price + getOffer(typedOffers, offerId).price , 0);
};

const getTripInfo = (tripEvents, destinations, offers) => {
  if (isEmpty(tripEvents)) {
    return {};
  }

  const first = tripEvents[0];
  const last = tripEvents[tripEvents.length - 1];
  const middle = tripEvents.slice(1, -1);
  const middleDestination = middle.length === 1 ? getDestinationName(destinations, middle[0]?.destination) : '...';
  return {
    start: getDestinationName(destinations, first.destination),
    middle: middleDestination,
    end: getDestinationName(destinations, last.destination),
    dateFrom: first.dateFrom,
    dateTo: last.dateTo,
    cost: tripEvents.reduce(
      (price, tripEvent) => price + tripEvent.basePrice + getOfferCost(tripEvent, offers), 0),
  };
};

export { getTripInfo };
