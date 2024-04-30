import { createElement } from '../render';

const FILTER_TYPES = ['Everything', 'Future', 'present', 'Past'];

const createFilterItemtemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
    <div class="trip-filters__filter">
      <input id="filter-${lowerType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerType}" checked>
      <label class="trip-filters__filter-label" for="filter-${lowerType}">${type}</label>
    </div>`;
};

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