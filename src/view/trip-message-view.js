import AbstractView from '../framework/view/abstract-view';
import { render, remove } from '../framework/render';

const getTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class TripMessageView extends AbstractView {
  #message = '';

  constructor ({ container, message }) {
    super();
    this.#message = message;
    render(this, container);
  }

  get template() {
    return getTemplate(this.#message);
  }

  destroy = () => remove(this);
}
