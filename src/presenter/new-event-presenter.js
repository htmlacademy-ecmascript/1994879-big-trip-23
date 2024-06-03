import { render, RenderPosition } from '../framework/render.js';
import TripEventEditView from '../view/event-edit/trip-event-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscKeydown } from '../utils/common.js';

export default class NewEventPresenter {
  #container = null;
  #tripEventEditView = null;
  #tripEventChangeHandler = null;
  #tripEventDestroyHandler = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#tripEventChangeHandler = onDataChange;
    this.#tripEventDestroyHandler = onDestroy;
  }

  init = ({ offers, destinations }) => {
    if (this.#tripEventEditView !== null) {
      return;
    }
    this.#tripEventEditView = new TripEventEditView({
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    render(this.#tripEventEditView, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  };

  destroy = () => {
    if (this.#tripEventEditView === null) {
      return;
    }
    this.#tripEventEditView.destroy();
    this.#tripEventEditView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#tripEventDestroyHandler();
  };

  setSaving = (isSaving = true) => this.#tripEventEditView.updateElement({ isSaving });
  setAborting = () => this.#tripEventEditView.shake(this.setSaving(false));

  #onFormSubmit = (tripEvent) => this.#tripEventChangeHandler(UserAction.ADD, UpdateType.MAJOR, tripEvent);
  #onFormCancel = () => this.destroy();

  #onEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      this.destroy();
    }
  };
}
