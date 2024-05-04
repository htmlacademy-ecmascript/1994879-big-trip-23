import { getMockedEvents } from '../mock/event-mock';
import { getMockedDestionations } from '../mock/destination-mock';
import { getMockedOffers } from '../mock/offer-mock';

export default class TripEventModel {
  constructor() {
    this.destinations = [];
    this.offers = [];
    this.tripEvents = [];
  }

  init() {
    this.destinations = getMockedDestionations();
    this.offers = getMockedOffers();
    this.tripEvents = getMockedEvents();
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
