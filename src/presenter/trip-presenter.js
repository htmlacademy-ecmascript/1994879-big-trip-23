
import { isEmpty } from '../utils/common';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripMessageView from '../view/trip-message-view';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';
import { UserAction, UpdateType, Messages, TripEmptyMessages, DEFAULT_SORT_TYPE, DEFAULT_FILTER, UiBlockerConfig } from '../const';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { getFiltered } from '../model/utils/filter';
import { getSorted } from '../model/utils/sort';

export default class TripPresenter {
  #model = null;
  #container = null;
  #tripEventsView = null;
  #tripSortView = null;
  #tripMessageView = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #addButton = null;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker(UiBlockerConfig);

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
    const filteredTripEvents = getFiltered(this.#model.tripEvents, this.#model.currentFilter);
    return getSorted(filteredTripEvents, this.#model.currentSort);
  }

  #renderSortView = () => {
    this.#tripSortView = new TripSortView({
      currentSort: this.#model.currentSort,
      container: this.#container,
      onSortTypeChange: this.#onSortTypeChange,
    });
  };

  #renderTripEventsView = (tripEvents) => {
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
  };

  #renderMessageView = () => {
    const getMessage = () => {
      switch (true) {
        case this.#isLoading:
          return Messages.LOADING;
        case this.#isError:
          return Messages.ERROR;
        case isEmpty(this.tripEvents):
          return TripEmptyMessages[this.#model.currentFilter];
        default:
          return '';
      }
    };

    const message = getMessage();
    if (message) {
      this.#tripMessageView = new TripMessageView({ message, container: this.#container });
    }
    return Boolean(message);
  };

  #clearMessageView = () => {
    if (this.#tripMessageView) {
      this.#tripMessageView.destroy();
    }
  };

  #renderTripEvents = () => {
    if (this.#renderMessageView()) {
      return;
    }

    this.#renderSortView();
    this.#renderTripEventsView(this.tripEvents);
  };

  #clearTripEvents = (resetSortType = false) => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#tripSortView) {
      this.#tripSortView.destroy();
    }

    if (resetSortType) {
      this.#model.currentSort = DEFAULT_SORT_TYPE;
    }
  };

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
    this.#clearMessageView();
    this.#setAddButtonDisabled(true);
  };

  #onNewEventClose = () => {
    this.#setAddButtonDisabled(false);
    this.#renderMessageView();
  };

  #onTripEventChange = async (actionType, updateType, data) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.ADD:
        this.#newEventPresenter.setSaving();
        try {
          await this.#model.addTripEvent(updateType, data);
        } catch(error) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE:
        this.#eventPresenters.get(data.id).setSaving();
        try {
          await this.#model.updateTripEvent(updateType, data);
        } catch(error) {
          this.#eventPresenters.get(data.id).setAborting();
        }
        break;
      case UserAction.DELETE:
        this.#eventPresenters.get(data.id).setDeleting();
        try {
          await this.#model.deleteTripEvent(updateType, data);
        } catch(error) {
          this.#eventPresenters.get(data.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #onModelChange = (updateType, data) => {
    this.#clearMessageView();
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        this.#onTripEventModeChange();
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents(true);
        this.#renderTripEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#setAddButtonDisabled(this.#isLoading);
        this.#renderTripEvents();
        break;
      case UpdateType.ERROR:
        this.#isError = true;
        this.#renderTripEvents();
        break;
    }
  };
}
