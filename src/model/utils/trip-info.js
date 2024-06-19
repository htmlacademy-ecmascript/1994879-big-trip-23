import { isEmpty } from '../../utils/common';
import { getEventOffers, getDestination, getOffer } from './common';

const getDestinationName = (destinations, destinationId) => {
  const currentDestination = getDestination(destinations, destinationId);
  return currentDestination ? currentDestination.name : '';
};

const getOffersCost = (tripEvent, offers) => {
  const eventOffers = getEventOffers(offers, tripEvent.type).offers;
  return tripEvent.offers.reduce((price, offerId) => price + getOffer(eventOffers, offerId).price , 0);
};

const getTripInfo = (tripEvents, destinations, offers) => {
  if (isEmpty(tripEvents)) {
    return {};
  }

  const collapsedTrip = tripEvents.reduce((acc, tripEvent) => acc.at(-1) === tripEvent ? acc : [...acc, tripEvent], []);

  const first = collapsedTrip.at(0);
  const last = collapsedTrip.at(-1);
  const middle = collapsedTrip.slice(1, -1);
  const middleDestination = middle.length === 1 ? getDestinationName(destinations, middle[0].destination) : '...';
  return {
    start: getDestinationName(destinations, first.destination),
    middle: middle.length ? middleDestination : '',
    end: getDestinationName(destinations, last.destination),
    dateFrom: first.dateFrom,
    dateTo: last.dateTo,
    cost: tripEvents.reduce(
      (price, tripEvent) => price + tripEvent.basePrice + getOffersCost(tripEvent, offers), 0),
  };
};

export { getTripInfo };
