import AbstractView from '../framework/view/abstract-view';
import { render } from '../framework/render';
import { TripEmptyMessages } from '../const';

const createEmptyTemplate = (filter) => `<p class="trip-events__msg">${TripEmptyMessages[filter]}</p>`;

export default class TripEmptyView extends AbstractView {
  #filter = '';

  constructor({ filter }) {
    super();
    this.#filter = filter;
    render(this, container);
  }

  get template() {
    return createEmptyTemplate(this.#filter);
  }
}
