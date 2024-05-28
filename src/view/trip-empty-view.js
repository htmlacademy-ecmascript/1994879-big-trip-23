import AbstractView from '../framework/view/abstract-view';
import { render, remove } from '../framework/render';
import { TripEmptyMessages } from '../utils/filter';

const createEmptyTemplate = (filter) => `<p class="trip-events__msg">${TripEmptyMessages[filter]}</p>`;

export default class TripEmptyView extends AbstractView {
  #filter = '';

  constructor({ filter, container }) {
    super();
    this.#filter = filter;
    render(this, container);
  }

  get template() {
    return createEmptyTemplate(this.#filter);
  }

  destroy() {
    remove(this);
  }
}
