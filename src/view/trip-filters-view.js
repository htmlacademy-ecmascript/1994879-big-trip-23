import AbstractView from '../framework/view/abstract-view';
import { firstLetterUpperCase, calculateChecked } from '../utils/common';

const createFilterItemTemplate = (value, isChecked) => `
  <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${calculateChecked(isChecked)}>
    <label class="trip-filters__filter-label" for="filter-${value}">${firstLetterUpperCase(value)}</label>
  </div>
`;

const createFiltersTemplate = (filters, currentFilter) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, filter === currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class TripFiltersView extends AbstractView {
  #filters = [];
  #currentFilter = '';

  constructor({filters, currentFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }
}
