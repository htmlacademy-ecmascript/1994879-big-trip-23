import { Filters, DEFAULT_FILTER, DEFAULT_SORT_TYPE, UpdateType } from '../const';
import { BASE_URL, AUTHORIZATION } from '../service/const';
import TripApiService from '../service/trip-api-service';
import Observable from '../framework/observable';
import { removeItem } from '../utils/common';
import { getTripInfo } from './utils/trip-info';
import { getSorted } from './utils/sort';

export default class TripEventModel extends Observable {
  #destinations = [];
  #offers = [];
  #tripEvents = [];
  #filters = [];
  #currentFilter = DEFAULT_FILTER;
  #currentSort = DEFAULT_SORT_TYPE;
  #tripApiService = new TripApiService(BASE_URL, AUTHORIZATION);

  get tripEvents() {
    return this.#tripEvents;
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

  set currentSort(sortType) {
    this.#currentSort = sortType;
  }

  get tripInfo() {
    const sortedTripEvents = getSorted(this.#tripEvents, DEFAULT_SORT_TYPE);
    return getTripInfo(sortedTripEvents, this.#destinations, this.#offers);
  }

  init = async () => {
    try {
      this.#destinations = await this.#tripApiService.getDestinations();
      this.#offers = await this.#tripApiService.getOffers();
      this.#tripEvents = (await this.#tripApiService.getPoints()).map(TripApiService.adaptToClient);
    } catch(error) {
      this.#destinations = [];
      this.#offers = [];
      this.#tripEvents = [];
      this._notify(UpdateType.ERROR);
    }

    this.#filters = Object.values(Filters);
    this._notify(UpdateType.INIT);
  };

  setCurrentFilter = (updateType, filterType) => {
    this.#currentFilter = filterType;
    this._notify(updateType, filterType);
  };

  addTripEvent = async (updateType, tripEvent) => {
    try {
      const newTripEvent = await this.#tripApiService.addPoint(tripEvent);
      this.#tripEvents.push(newTripEvent);
      this._notify(updateType, newTripEvent);
    } catch(error) {
      throw new Error(`Add error: ${error.message}`);
    }
  };

  updateTripEvent = async (updateType, tripEvent) => {
    const selectedTripEvent = this.#findTripEvent(tripEvent.id);
    if (!selectedTripEvent) {
      throw new Error(`Can't update trip event ${tripEvent.id}`);
    }

    try {
      const updatedTripEvent = await this.#tripApiService.updatePoint(tripEvent);
      Object.assign(selectedTripEvent, updatedTripEvent);
      this._notify(updateType, tripEvent);
    } catch(error) {
      throw new Error(`Update error: ${error.message}`);
    }
  };

  deleteTripEvent = async (updateType, tripEvent) => {
    const selectedTripEvent = this.#findTripEvent(tripEvent.id);
    if (!selectedTripEvent) {
      throw new Error(`Can't delete trip event ${tripEvent.id}`);
    }
    try {
      await this.#tripApiService.deletePoint(tripEvent);
      this.#tripEvents = removeItem(this.#tripEvents, selectedTripEvent);
      this._notify(updateType);
    } catch(error) {
      throw new Error(`Delete error: ${error.message}`);
    }
  };

  #findTripEvent = (id) => this.#tripEvents.find((tripEvent) => tripEvent.id === id);
}
