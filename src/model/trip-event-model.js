import { getMockedEvents } from '../mock/event-mock';
import { getMockedDestionations } from '../mock/destination-mock';
import { getMockedOffers } from '../mock/offer-mock';

export default class TripEventModel {
  #destinations = [];
  #offers = [];
  #tripEvents = [];

  init() {
    this.destinations = getMockedDestionations();
    this.offers = getMockedOffers();
    this.tripEvents = getMockedEvents();
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  set tripEvents(tripEvents) {
    this.#tripEvents = tripEvents;
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations(descriptions) {
    this.#destinations = descriptions;
  }
}
