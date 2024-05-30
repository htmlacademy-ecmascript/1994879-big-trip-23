import { render, RenderPosition } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewTaskPresenter {
  #container = null;
  #eventEditView = null;
  #tripEventChangeHandler = null;
  #tripEventDestroyHandler = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#tripEventChangeHandler = onDataChange;
    this.#tripEventDestroyHandler = onDestroy;
  }

  init({ offers, destinations }) {
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
  }

  destroy() {
    if (this.#eventEditView === null) {
      return;
    }

    this.#eventEditView.destroy();
    this.#eventEditView = null;
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#tripEventDestroyHandler();
  }

  #onFormSubmit = (tripEvent) => {
    this.#tripEventChangeHandler(UserAction.ADD, UpdateType.MAJOR, tripEvent);
    this.destroy();
  };

  #onFormCancel = () => this.destroy();

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.destroy();
    }
  };
}
