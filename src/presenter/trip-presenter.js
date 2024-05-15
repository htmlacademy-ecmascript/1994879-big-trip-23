import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEmptyView from '../view/trip-empty-view';
import EventPresenter from './event-presenter';
import { updateItem } from '../utils/common';

export default class TripPresenter {
  #model = null;
  #container = null;
  #tripEvents = [];
  #tripEventsView = null;
  #tripSortView = null;
  #tripEmptyView = null;
  #eventPresenters = new Map();

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;
  }

  init() {
    this.#tripEvents = this.#model.tripEvents;
    this.#clearTripEvents();
    this.#renderTripEvents();
  }

  #renderEmptyView() {
    this.#tripEmptyView = new TripEmptyView({ filter: this.#model.currentFilter, container: this.#container });
  }

  #renderSortView({ sortTypes, currentSort }) {
    if (this.#tripSortView) {
      return;
    }

    this.#tripSortView = new TripSortView({
      sortTypes,
      currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  }

  #renderTripEvents() {
    if (isEmpty(this.#tripEvents)) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSortView(this.#model);
    this.#tripEventsView = new TripEventsView({ container: this.#container });

    this.#tripEvents.forEach((tripEvent) => {
      const eventPresenter = new EventPresenter({
        model: this.#model,
        container: this.#tripEventsView.element,
        onTripEventChange: this.#onTripEventChange,
        onModeChange: this.#onTripEventModeChange,
      });
      eventPresenter.init(tripEvent);
      this.#eventPresenters.set(tripEvent.id, eventPresenter);
    });
  }

  #clearTripEvents() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#tripEmptyView) {
      this.#tripEmptyView.destroy();
    }
  }

  #onTripEventChange = (updatedTripEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedTripEvent);
    this.#eventPresenters.get(updatedTripEvent.id).init(updatedTripEvent);
  };

  #onTripEventModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #onSortTypeChange = (newSort) => {
    if (this.#model.currentSort === newSort) {
      return;
    }

    this.#model.currentSort = newSort;
    this.init();
  };
}
