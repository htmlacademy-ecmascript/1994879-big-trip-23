import AbstractView from '../../framework/view/abstract-view';
import { getTripEventTemplate } from './template';
import { render, remove } from '../../framework/render';
import { BLANK_TRIP_EVENT } from '../../const';

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #offers = null;
  #destinations = null;
  #editClickHandler = null;
  #favoriteClickHandler = null;
  #rollupButtonElement = null;
  #favoriteButtonElement = null;

  constructor({tripEvent = BLANK_TRIP_EVENT, offers, destinations, container, onEditClick, onFavoriteClick}) {
    super();
    this.#tripEvent = tripEvent;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#editClickHandler = onEditClick;
    this.#favoriteClickHandler = onFavoriteClick;
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#favoriteButtonElement = this.element.querySelector('.event__favorite-btn');

    this.#rollupButtonElement.addEventListener('click', this.#onClick);
    this.#favoriteButtonElement.addEventListener('click', this.#onFavoriteClick);
    render(this, container);
  }

  get template() {
    return getTripEventTemplate(this.#tripEvent, this.#offers, this.#destinations);
  }

  destroy = () => remove(this);

  removeElement = () => {
    super.removeElement();
    this.#rollupButtonElement.removeEventListener('click', this.#onClick);
    this.#favoriteButtonElement.removeEventListener('click', this.#onFavoriteClick);
  };

  #onClick = (evt) => {
    evt.preventDefault();
    this.#editClickHandler();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#favoriteClickHandler();
  };
}
