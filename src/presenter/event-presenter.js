import EventEditView from '../view/event-edit/event-edit-view';
import TripEventView from '../view/event-view/trip-event-view';
import { replace } from '../framework/render';
import { UserAction, UpdateType, FormMode } from '../const';
import { isEscKeydown } from '../utils/common';

export default class EventPresenter {
  #tripEvent = null;
  #model = null;
  #container = null;
  #tripEventView = null;
  #eventEditView = null;
  #tripEventChangeHandler = null;
  #changeModeHandler = null;
  #mode = FormMode.VIEW;

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
      case FormMode.VIEW:
        this.#switchToViewMode();
        break;
      case FormMode.EDIT:
        this.#switchToEditMode();
        break;
    }
    this.#mode = newMode;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;
    this.#renderTripEvent(tripEvent);
  };

  destroy = () => {
    this.#tripEventView.destroy();
    this.#eventEditView.destroy();
    this.#removeListeners();
  };

  resetView = () => {
    this.mode = FormMode.VIEW;
  };

  setSaving = () => {
    if (this.#mode === FormMode.EDIT) {
      this.#eventEditView.updateElement({ isSaving: true, isDeleting: false });
    }
  };

  setDeleting = () => {
    if (this.#mode === FormMode.EDIT) {
      this.#eventEditView.updateElement({ isDeleting: true, isSaving: false });
    }
  };

  setAborting = () => {
    if (this.#mode === FormMode.VIEW) {
      this.#tripEventView.shake();
      return;
    }
    const resetFormState = () => this.#eventEditView.updateElement({ isSaving: false, isDeleting: false });
    this.#eventEditView.shake(resetFormState);
  };

  #renderTripEvent = (tripEvent) => {
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

    if (this.mode === FormMode.EDIT) {
      replace(this.#eventEditView, prevEventEditView);
    }

    if (this.mode === FormMode.VIEW) {
      this.#eventEditView.reset(tripEvent);
      replace(this.#tripEventView, prevTripEventView);
    }

    prevTripEventView.destroy();
    prevEventEditView.destroy();
  };

  #switchToEditMode = () => {
    replace(this.#eventEditView, this.#tripEventView);
    this.#addListeners();
    this.#changeModeHandler();
  };

  #switchToViewMode = () => {
    this.#eventEditView.reset(this.#tripEvent);
    replace(this.#tripEventView, this.#eventEditView);
    this.#removeListeners();
  };

  #onEditClick = () => {
    this.mode = FormMode.EDIT;
  };

  #onFormCancel = () => {
    this.mode = FormMode.VIEW;
  };

  #addListeners = () => document.addEventListener('keydown', this.#onEscKeydown);
  #removeListeners = () => document.removeEventListener('keydown', this.#onEscKeydown);

  #onFormDelete = (tripEvent) => this.#tripEventChangeHandler(UserAction.DELETE, UpdateType.MINOR, tripEvent);
  #onFormSubmit = (tripEvent) => this.#tripEventChangeHandler(UserAction.UPDATE, UpdateType.MINOR, tripEvent);

  #onFavoriteClick = () => this.#tripEventChangeHandler(UserAction.UPDATE, UpdateType.PATCH,
    { ...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite }
  );

  #onEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      this.mode = FormMode.VIEW;
    }
  };
}
