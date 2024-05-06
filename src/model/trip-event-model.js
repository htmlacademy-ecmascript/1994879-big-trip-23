import { getMockedEvents } from '../mock/event-mock';
import { getMockedDestionations } from '../mock/destination-mock';
import { getMockedOffers } from '../mock/offer-mock';
import { Filters, SORT_TYPES } from '../const';

export default class TripEventModel {
  #destinations = [];
  #offers = [];
  #tripEvents = [];
  #filters = [];
  #sortTypes = [];

  init() {
    this.destinations = getMockedDestionations();
    this.offers = getMockedOffers();
    this.tripEvents = getMockedEvents();
    this.#filters = Object.values(Filters);
    this.#sortTypes = SORT_TYPES;
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

  get filters() {
    return this.#filters;
  }

  get sortTypes() {
    return this.#sortTypes;
  }
}
