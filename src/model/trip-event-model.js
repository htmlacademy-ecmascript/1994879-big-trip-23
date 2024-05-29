import { Filters, DEFAULT_FILTER, DEFAULT_SORT_TYPE, UpdateType } from '../const';
import { BASE_URL, AUTHORIZATION } from '../service/const';
import { FilterFunctions } from '../utils/filter';
import { SortFunctions } from '../utils/sort';
import TripApiService from '../service/trip-api-service';
import Observable from '../framework/observable';
import { removeItem } from '../utils/common';

export default class TripEventModel extends Observable {
  #destinations = [];
  #offers = [];
  #tripEvents = [];
  #filters = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get tripEvents() {
    const filteredTripEvents = this.#getFilteredTripEvents(this.#tripEvents, this.currentFilter);
    return this.#getSortedTripEvents(filteredTripEvents, this.currentSort);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get filters() {
    return this.#filters;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  get currentSort() {
    return this.#currentSort;
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
    try {
      this.#destinations = await this.#tripApiService.getDestinations();
      this.#offers = await this.#tripApiService.getOffers();
      this.#tripEvents = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
    } catch(error) {
      this._notify(UpdateType.ERROR);
      this.#destinations = [];
      this.#offers = [];
      this.#tripEvents = [];
    }

    this.#filters = Object.values(Filters);
    this._notify(UpdateType.MAJOR);
  }

  setCurrentSort(updateType, sortType) {
    if (sortType === this.#currentSort) {
      return;
    }
    this.#currentSort = sortType;
    this._notify(updateType, sortType);
  }

  setCurrentFilter(updateType, filterType) {
    if (filterType === this.#currentFilter) {
      return;
    }
    this.#currentFilter = filterType;
    this._notify(updateType, filterType);
  }

  async addTripEvent(updateType, tripEvent) {
    try {
      const newTripEvent = await this.#tripApiService.addPoint(tripEvent);
      this.#tripEvents.push(newTripEvent);
      this._notify(updateType, newTripEvent);
    } catch(error) {
      throw new Error(error);
    };
  }

  async updateTripEvent(updateType, tripEvent) {
    const selectedTripEvent = this.#findTripEvent(tripEvent.id);
    if (!selectedTripEvent) {
      throw new Error(`Can't update trip event ${tripEvent.id}`);
    }

    try {
      const updatedTripEvent = await this.#tripApiService.updatePoint(tripEvent);
      Object.assign(selectedTripEvent, updatedTripEvent);
      this._notify(updateType, tripEvent);
    } catch(error) {
      throw new Error(error);
    };
  }

  async deleteTripEvent(updateType, tripEvent) {
    const selectedTripEvent = this.#findTripEvent(tripEvent.id);
    if (!selectedTripEvent) {
      throw new Error(`Can't delete trip event ${tripEvent.id}`);
    }
    try {
      await this.#tripApiService.deletePoint(tripEvent);
    } catch(error) {
      throw new Error(error);
    };

    this.#tripEvents = removeItem(this.#tripEvents, selectedTripEvent);
    this._notify(updateType);
  }

  #getSortedTripEvents = (tripEvents, sortType) => tripEvents.sort(SortFunctions[sortType]);
  #getFilteredTripEvents = (tripEvents, filter) => tripEvents.filter(FilterFunctions[filter]);
  #getDestinationName = (id) => this.#destinations.find((destination) => destination.id === id).name;
  #findTripEvent = (id) => this.#tripEvents.find((tripEvent) => tripEvent.id === id);
}
