import EventEditView from '../view/event-edit-view';
import TripEventView from '../view/trip-event-view';
import { render, replace, remove } from '../framework/render';

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

  init(tripEvent) {
    this.#tripEvent = tripEvent;
    this.#renderTripEvent(tripEvent);
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
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#eventEditView = new EventEditView({
      tripEvent,
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    if (prevTripEventView === null || prevEventEditView === null) {
      render(this.#tripEventView, this.#container);
      return;
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#eventEditView, prevEventEditView);
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#tripEventView, prevTripEventView);
    }

    remove(prevTripEventView);
    remove(prevEventEditView);
  }

  destroy() {
    remove(this.#tripEventView);
    remove(this.#eventEditView);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#switchToViewMode();
    }
  }

  #onEditClick = () => this.#switchToEditMode();
  #onFormCancel = () => this.#switchToViewMode();

  #onFormSubmit = (tripEvent) => {
    this.#tripEventChangeHandler(tripEvent);
    this.#switchToViewMode();
  };

  #onFavoriteClick = () => this.#tripEventChangeHandler({
    ...this.#tripEvent,
    isFavorite: !this.#tripEvent.isFavorite,
  });

  #switchToEditMode() {
    replace(this.#eventEditView, this.#tripEventView);
    document.addEventListener('keydown', this.#onEscKeydown);

    this.#changeModeHandler();
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    replace(this.#tripEventView, this.#eventEditView);
    document.removeEventListener('keydown', this.#onEscKeydown);

    this.#mode = Mode.VIEW;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };
}
