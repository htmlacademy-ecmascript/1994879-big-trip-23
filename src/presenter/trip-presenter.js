import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEmptyView from '../view/trip-empty-view';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';
import { UserAction, UpdateType, DEFAULT_SORT_TYPE, DEFAULT_FILTER } from '../const';

export default class TripPresenter {
  #model = null;
  #container = null;
  #tripEventsView = null;
  #tripSortView = null;
  #tripEmptyView = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #addButton = null;

  constructor({ container, model, addButton }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange);
    this.#addButton = addButton;
    this.#addButton.addEventListener('click', this.#onAddButtonClick);

    this.#tripEventsView = new TripEventsView({ container: this.#container });
    this.#newEventPresenter = new NewEventPresenter({
      model,
      container: this.#tripEventsView.element,
      onDataChange: this.#onTripEventChange,
      onDestroy: this.#onNewEventClose
    });

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
    this.#newEventPresenter.destroy();
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

  #setAddButtonDisabled = (disabled) => (this.#addButton.disabled = disabled);

  #onTripEventModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortTypeChange = (sortType) => {
    this.#model.currentSort = sortType;
    this.#onModelChange(UpdateType.MINOR);
  };

  #onAddButtonClick = () => {
    this.#onTripEventModeChange();
    this.#model.currentSort = DEFAULT_SORT_TYPE;
    this.#model.setCurrentFilter(UpdateType.MAJOR, DEFAULT_FILTER);
    this.#newEventPresenter.init(this.#model);
    this.#setAddButtonDisabled(true);
  };

  #onNewEventClose = () => this.#setAddButtonDisabled(false);

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

}
