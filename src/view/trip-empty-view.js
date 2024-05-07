import AbstractView from '../framework/view/abstract-view';
import { TripEmptyMessages } from '../const';

const createEmptyTemplate = (filter) => `<p class="trip-events__msg">${TripEmptyMessages[filter]}</p>`;

export default class TripEmptyView extends AbstractView {
  #filter = '';

  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyTemplate(this.#filter);
  }
}
