import TripFiltersView from '../view/trip-filters-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  #model = null;
  #filterContainer = null;
  #infoContainer = null;
  #tripFiltersView = null;

  constructor ({ container, model }) {
    this.#filterContainer = container.filter;
    this.#infoContainer = container.info;
    this.#model = model;
  }

  init() {
    this.#renderSummary(this.#model);
    this.#renderFilters(this.#model);
  }

  #renderSummary({ tripInfo }) {
    new TripInfoView({ tripInfo, container: this.#infoContainer });
  }

  #renderFilters({ filters, currentFilter }) {
    this.#tripFiltersView = new TripFiltersView({
      filters,
      currentFilter,
      container: this.#filterContainer,
      onFilterChange: this.#onFilterChange
    });
  }

  #onFilterChange = (newFilter) => {
    if (this.#model.currentFilter === newFilter) {
      return;
    }

    this.#model.currentFilter = newFilter;
  };
}
