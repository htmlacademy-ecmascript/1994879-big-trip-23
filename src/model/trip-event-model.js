import { Filters, SortTypes, DEFAULT_FILTER, DEFAULT_SORT_TYPE } from '../const';
import { BASE_URL, AUTHORIZATION } from '../service/const';
import { FilterFunctions, SortFunctions } from '../utils/sort-filter';
import TripApiService from '../service/trip-api-service';
import Observable from '../framework/observable';

export default class TripEventModel extends Observable {
  #destinations = [];
  #offers = [];
  #tripEvents = [];
  #filters = [];
  #sortTypes = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get tripEvents() {
    const filteredTripEvents = this.#getFilteredTripEvents(this.#tripEvents, this.currentFilter);
    return this.#getSortedTripEvents(filteredTripEvents, this.currentSort);
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
    if (filter === this.#currentFilter) {
      return;
    }
    this.#currentFilter = filter;
    this._notify();
  }

  get currentSort() {
    return this.#currentSort;
  }

  set currentSort(sortType) {
    if (sortType === this.#currentSort) {
      return;
    }
    this.#currentSort = sortType;
    this._notify();
  }

  get tripInfo() {
    const trip = this.#getSortedTripEvents(this.#tripEvents, DEFAULT_SORT_TYPE);
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
      cost: trip.reduce((price, tripEvent) => price + tripEvent.basePrice, 0),
    };
  }

  async init() {
    this.destinations = await this.#tripApiService.getDestinations();
    this.offers = await this.#tripApiService.getOffers();
    this.tripEvents = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
    this.#filters = Object.values(Filters);
    this.#sortTypes = Object.values(SortTypes);
  }

  #getSortedTripEvents = (tripEvents, sortType) => tripEvents.sort(SortFunctions[sortType]);
  #getFilteredTripEvents = (tripEvents, filter) => tripEvents.filter(FilterFunctions[filter]);
  #getDestinationName = (id) => this.#destinations.find((destination) => destination.id === id).name;
}
