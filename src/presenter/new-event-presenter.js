import { render, RenderPosition } from '../framework/render.js';
import EventEditView from '../view/event-edit/event-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscKeydown } from '../utils/common.js';

export default class NewEventPresenter {
  #container = null;
  #eventEditView = null;
  #tripEventChangeHandler = null;
  #tripEventDestroyHandler = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#tripEventChangeHandler = onDataChange;
    this.#tripEventDestroyHandler = onDestroy;
  }

  init = ({ offers, destinations }) => {
    if (this.#eventEditView !== null) {
      return;
    }
    this.#eventEditView = new EventEditView({
      offers,
      destinations,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    render(this.#eventEditView, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  };

  destroy = () => {
    if (this.#eventEditView === null) {
      return;
    }
    this.#eventEditView.destroy();
    this.#eventEditView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#tripEventDestroyHandler();
  };

  setSaving = (isSaving = true) => this.#eventEditView.updateElement({ isSaving });
  setAborting = () => this.#eventEditView.shake(this.setSaving(false));

  #onFormSubmit = (tripEvent) => this.#tripEventChangeHandler(UserAction.ADD, UpdateType.MAJOR, tripEvent);
  #onFormCancel = () => this.destroy();

  #onEscKeydown = (evt) => {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      this.destroy();
    }
  };
}
