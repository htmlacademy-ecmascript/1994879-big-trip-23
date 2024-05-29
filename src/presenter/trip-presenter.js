import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEmptyView from '../view/trip-empty-view';
import EventPresenter from './event-presenter';
import { UserAction, UpdateType } from '../const';

export default class TripPresenter {
  #model = null;
  #container = null;
  #tripEventsView = null;
  #tripSortView = null;
  #tripEmptyView = null;
  #eventPresenters = new Map();

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
    this.#onModelChange(UpdateType.MAJOR);
  }

  get tripEvents() {
    return this.#model.tripEvents;
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

  #renderTripEventsView(tripEvents) {
    if (!this.#tripEventsView) {
      this.#tripEventsView = new TripEventsView({ container: this.#container });
    }

    tripEvents.forEach((tripEvent) => {
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
    const tripEvents = this.tripEvents;
    if (isEmpty(tripEvents)) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSortView();
    this.#renderTripEventsView(tripEvents);
  }

  #clearTripEvents() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#tripEmptyView) {
      this.#tripEmptyView.destroy();
    }
  }

  #onTripEventModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #onSortTypeChange = (newSort) =>
    this.#onTripEventChange(UserAction.SORT, UpdateType.MINOR, newSort);

  #onTripEventChange = (actionType, updateType, data) => {
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
      case UserAction.SORT:
        this.#model.setCurrentSort(updateType, data);
        break;

    }
  };

  #onModelChange = (updateType, data) => {
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

}
