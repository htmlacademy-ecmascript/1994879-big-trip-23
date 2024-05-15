import { getMockedEvents } from '../mock/event-mock';
import { getMockedDestinations } from '../mock/destination-mock';
import { getMockedOffers } from '../mock/offer-mock';
import { Filters, SortTypes } from '../const';
import { sortByPrice, sortByTime, sortByDay } from '../utils/common';
import dayjs from 'dayjs';

export default class TripEventModel {
  #destinations = [];
  #offers = [];
  #tripEvents = [];
  #filters = [];
  #sortTypes = [];
  #defaultFilter = Filters.EVERYTHING;
  #defaultSortType = SortTypes.DAY;
  #currentFilter = this.#defaultFilter;
  #currentSort = this.#defaultSortType;

  get tripEvents() {
    const filteredTripEvents = this.#getFilteredTripEvents(this.#tripEvents, this.#currentFilter);
    return this.#getSortedTripEvents(filteredTripEvents, this.#currentSort);
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

  get currentFilter() {
    return this.#currentFilter;
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
  }

  get sortTypes() {
    const disabledSortTypes = [SortTypes.EVENT, SortTypes.OFFERS];
    return this.#sortTypes.map((type) => ({
      type,
      disabled: disabledSortTypes.includes(type),
    }));
  }

  get currentSort() {
    return this.#currentSort;
  }

  set currentSort(sortType) {
    this.#currentSort = sortType;
  }

  get tripInfo() {
    const trip = this.#getSortedTripEvents(this.#tripEvents, this.#defaultSortType);
    const first = trip[trip.length - 1];
    const last = trip[0];
    const middle = trip.slice(1, -1);
    const middleDestination = middle.length === 1 ? this.#getDestinationName(middle[0].destination) : '...';
    return {
      start: this.#getDestinationName(first.destination),
      middle: middleDestination,
      end:  this.#getDestinationName(last.destination),
      dateFrom: first.dateFrom,
      dateTo: last.dateTo,
      cost: trip.reduce((price, tripEvent) => price + tripEvent.price, 0),
    };
  }

  init() {
    this.destinations = getMockedDestinations();
    this.offers = getMockedOffers();
    this.tripEvents = getMockedEvents();
    this.#filters = Object.values(Filters);
    this.#sortTypes = Object.values(SortTypes);
  }

  #getSortedTripEvents = (tripEvents, sortType) => {
    switch (sortType) {
      case SortTypes.DAY:
        return tripEvents.sort(sortByDay);
      case SortTypes.TIME:
        return tripEvents.sort(sortByTime);
      case SortTypes.PRICE:
        return tripEvents.sort(sortByPrice);
      default:
        return new Error(`Invalid sort type: ${sortType}`);
    }
  };

  #getFilteredTripEvents = (tripEvents, filter) => {
    const currentDate = dayjs();
    switch (filter) {
      case Filters.EVERYTHING:
        return [...tripEvents];
      case Filters.FUTURE:
        return tripEvents.filter((tripEvent) => tripEvent.dateFrom > currentDate);
      case Filters.PRESENT:
        return tripEvents.filter((tripEvent) => tripEvent.dateFrom >= currentDate && tripEvent.dateTo <= currentDate);
      case Filters.PAST:
        return tripEvents.filter((tripEvent) => tripEvent.dateTo < currentDate);
      default:
        throw new Error(`Invalid filter: ${filter}`);
    }
  };

  #getDestinationName = (id) => this.#destinations.find((destination) => destination.id === id).name;
}
