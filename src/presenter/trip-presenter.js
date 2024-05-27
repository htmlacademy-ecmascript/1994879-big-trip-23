import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEmptyView from '../view/trip-empty-view';
import EventPresenter from './event-presenter';
import { UserAction, UpdateType } from '../const';

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
    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#tripEvents = this.#model.tripEvents;
    this.#onModelChange(UpdateType.MAJOR);
  }

  #renderEmptyView() {
    this.#tripEmptyView = new TripEmptyView({ filter: this.#model.currentFilter, container: this.#container });
  }

  #renderSortView() {
    if (this.#tripSortView) {
      return;
    }

    this.#tripSortView = new TripSortView({
      currentSort: this.#model.currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  }

  #renderTripEventsView() {
    if (!this.#tripEventsView) {
      this.#tripEventsView = new TripEventsView({ container: this.#container });
    }

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

  #renderTripEvents() {
    if (isEmpty(this.#tripEvents)) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSortView();
    this.#renderTripEventsView();
  }

  #clearTripEvents() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#tripEmptyView) {
      this.#tripEmptyView.destroy();
    }
  }

  #onTripEventChange = (actionType, updateType, data) => {
    console.log(actionType, updateType, data);
    switch (actionType) {
      case UserAction.UPDATE:
        this.#model.updateTripEvent(updateType, data);
        break;
      case UserAction.ADD:
        this.#model.addTripEvent(updateType, data);
        break;
      case UserAction.DELETE:
        this.#model.deleteTripEvent(updateType, data);
        break;
    }
  };

  #onModelChange = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
    }
  };

  #onTripEventModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #onSortTypeChange = (newSort) => {
    this.#model.currentSort = newSort;
    this.init();
  };
}
