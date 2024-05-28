import EventEditView from '../view/event-edit-view';
import TripEventView from '../view/trip-event-view';
import { replace, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const';

const Mode = {
  VIEW: 'View',
  EDIT: 'Edit',
};

export default class EventPresenter {
  #tripEvent = null;
  #model = null;
  #container = null;
  #tripEventView = null;
  #eventEditView = null;
  #tripEventChangeHandler = null;
  #changeModeHandler = null;
  #mode = Mode.VIEW;

  constructor({ model, container, onTripEventChange, onModeChange }) {
    this.#model = model;
    this.#container = container;
    this.#tripEventChangeHandler = onTripEventChange;
    this.#changeModeHandler = onModeChange;
  }

  get mode() {
    return this.#mode;
  }

  set mode(newMode) {
    if (this.mode === newMode) {
      return;
    }

    switch (newMode) {
      case Mode.VIEW:
        this.#switchToViewMode();
        break;
      case Mode.EDIT:
        this.#switchToEditMode();
        break;
    }
    this.#mode = newMode;
  }

  init(tripEvent) {
    this.#tripEvent = tripEvent;
    this.#renderTripEvent(tripEvent);
  }

  destroy() {
    remove(this.#tripEventView);
    remove(this.#eventEditView);
    this.#removeListeners();
  }

  resetView() {
    this.mode = Mode.VIEW;
  }

  #renderTripEvent(tripEvent) {
    const offers = this.#model.offers;
    const destinations = this.#model.destinations;

    const prevTripEventView = this.#tripEventView;
    const prevEventEditView = this.#eventEditView;

    this.#tripEventView = new TripEventView({
      tripEvent,
      offers,
      destinations,
      container: this.#container,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#eventEditView = new EventEditView({
      tripEvent,
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormDelete: this.#onFormDelete,
      onFormCancel: this.#onFormCancel,
    });

    if (prevTripEventView === null || prevEventEditView === null) {
      return;
    }

    if (this.mode === Mode.EDIT) {
      replace(this.#eventEditView, prevEventEditView);
    }

    if (this.mode === Mode.VIEW) {
      this.#eventEditView.reset(tripEvent);
      replace(this.#tripEventView, prevTripEventView);
    }

    remove(prevTripEventView);
    remove(prevEventEditView);
  }

  #switchToEditMode() {
    replace(this.#eventEditView, this.#tripEventView);
    this.#addListeners();
    this.#changeModeHandler();
  }

  #switchToViewMode() {
    this.#eventEditView.reset(this.#tripEvent);
    replace(this.#tripEventView, this.#eventEditView);
    this.#removeListeners();
  }

  #onEditClick = () => (this.mode = Mode.EDIT);
  #onFormCancel = () => (this.mode = Mode.VIEW);
  #addListeners = () => document.addEventListener('keydown', this.#onEscKeydown);
  #removeListeners = () => document.removeEventListener('keydown', this.#onEscKeydown);

  #onFormDelete = (tripEvent) => {
    if (tripEvent.id) {
      this.#tripEventChangeHandler(
        UserAction.DELETE,
        UpdateType.MINOR,
        tripEvent
      );
    }
  };

  #onFormSubmit = (tripEvent) => {
    this.#tripEventChangeHandler(
      UserAction.UPDATE,
      UpdateType.MINOR,
      tripEvent
    );
  };

  #onFavoriteClick = () => this.#tripEventChangeHandler(
    UserAction.UPDATE,
    UpdateType.PATCH,
    { ...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite }
  );

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.mode = Mode.VIEW;
    }
  };
}
