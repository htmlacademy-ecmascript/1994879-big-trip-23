import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEmptyView from '../view/trip-empty-view';
import EventPresenter from './event-presenter';
import { UserAction, UpdateType, DEFAULT_SORT_TYPE, DEFAULT_FILTER, BLANK_TRIP_EVENT } from '../const';

export default class TripPresenter {
  #model = null;
  #container = null;
  #tripEventsView = null;
  #tripSortView = null;
  #tripEmptyView = null;
  #eventPresenters = new Map();
  #addButton = null;

  constructor({ container, model, addButton }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
    this.#addButton = addButton;
    this.#addButton.addEventListener('click', this.#onAddButtonClick);

    this.#renderTripEvents();
  }

  get tripEvents() {
    return this.#model.tripEvents;
  }

  #renderEmptyView() {
    this.#tripEmptyView = new TripEmptyView({ filter: this.#model.currentFilter, container: this.#container });
  }

  #renderSortView() {
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

  #clearTripEvents({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#tripSortView) {
      this.#tripSortView.destroy();
    }
    if (this.#tripEmptyView) {
      this.#tripEmptyView.destroy();
    }
    if (resetSortType) {
      this.#model.currentSort = DEFAULT_SORT_TYPE;
    }
  }

  #onTripEventModeChange = () => this.#eventPresenters.forEach((presenter) => presenter.resetView());

  #onSortTypeChange = (sortType) => {
    this.#model.currentSort = sortType;
    this.#onModelChange(UpdateType.MINOR);
  };

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
    }
  };

  #onModelChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#onTripEventModeChange();
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({resetSortType: true});
        this.#renderTripEvents();
        break;
    }
  };

  #onAddButtonClick = (evt) => {
    evt.preventDefault();
    this.#model.currentSort = DEFAULT_SORT_TYPE;
    this.#model.setCurrentFilter(UpdateType.MAJOR, DEFAULT_FILTER);
    this.#addTripEvent();
    this.#addButton.disabled = true;
  };

  #addTripEvent() {
    const eventPresenter = new EventPresenter({
      model: this.#model,
      container: this.#tripEventsView.element,
      onTripEventChange: this.#onTripEventChange,
      onModeChange: this.#onTripEventModeChange,
    });
    eventPresenter.init(BLANK_TRIP_EVENT);
    this.#eventPresenters.set(BLANK_TRIP_EVENT.id, eventPresenter);
  }

}
