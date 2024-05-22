import EventEditView from '../view/event-edit-view';
import TripEventView from '../view/trip-event-view';
import { replace, remove } from '../framework/render';

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

  destroy() {
    remove(this.#tripEventView);
    remove(this.#eventEditView);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#switchToViewMode();
    }
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
      onFormCancel: this.#onFormCancel,
    });

    if (prevTripEventView === null || prevEventEditView === null) {
      return;
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#eventEditView, prevEventEditView);
    }

    if (this.#mode === Mode.VIEW) {
      this.#eventEditView.reset(tripEvent);
      replace(this.#tripEventView, prevTripEventView);
    }

    remove(prevTripEventView);
    remove(prevEventEditView);
  }

  #switchToEditMode() {
    replace(this.#eventEditView, this.#tripEventView);
    document.addEventListener('keydown', this.#onEscKeydown);

    this.#changeModeHandler();
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    this.#eventEditView.reset(this.#tripEvent);
    replace(this.#tripEventView, this.#eventEditView);
    document.removeEventListener('keydown', this.#onEscKeydown);

    this.#mode = Mode.VIEW;
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

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.#switchToViewMode();
    }
  };
}
