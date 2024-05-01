import { getMockedEvents } from '../mock/event-mock';
import { getMockedDestionations } from '../mock/destination-mock';
import { getMockedOffers } from '../mock/offer-mock';
import { getRandomBoolean } from '../mock/utils';

export default class TripEventModel {
  constructor() {
    this.destinations = getMockedDestionations();
    this.offers = getMockedOffers();

    this.tripEvents = getMockedEvents().map((tripEvent) => {
      const { offers } = this.offers.find((offer) => offer.type === tripEvent.type);

      return {
        ...tripEvent,
        destination: this.destinations.find((dest) => dest.id === tripEvent.destination),
        offers: offers.map((offer) => ({
          type: tripEvent.type,
          ...offer,
          selected: getRandomBoolean(),
        })),
      };
    });
  }

  getTripEvents() {
    return this.tripEvents;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
