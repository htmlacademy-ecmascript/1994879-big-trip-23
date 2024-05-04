import { createElement } from '../render';
import { firstLetterUpperCase } from '../utils';

const FILTER_TYPES = ['Everything', 'Future', 'Present', 'Past'];

const createFilterItemtemplate = (type) => `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" checked>
    <label class="trip-filters__filter-label" for="filter-${type}">${firstLetterUpperCase(type)}</label>
  </div>
`;

const createFiltersTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${FILTER_TYPES.map((type) => createFilterItemtemplate(type)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class TripFiltersView {
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
