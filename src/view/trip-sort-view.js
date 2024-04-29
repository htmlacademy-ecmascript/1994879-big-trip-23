import { createElement } from '../render';

const SORT_TYPES = ['Day', 'Event', 'Time', 'Price', 'Offers'];

const createSortItemtemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
    <div class="trip-sort__item  trip-sort__item--${lowerType}">
      <input id="sort-${lowerType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-${lowerType}">${type}</label>
    </div>`;
};

const createFiltersTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((type) => createSortItemtemplate(type)).join('')}
  </form>
`;

export default class TripSortView {
  getTemplate() {
    return createFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
