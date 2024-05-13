import TripFiltersView from '../view/trip-filters-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  #model = null;
  #filterContainer = null;
  #infoContainer = null;

  constructor ({ container, model }) {
    this.#filterContainer = container.filter;
    this.#infoContainer = container.info;
    this.#model = model;
  }

  init() {
    this.#renderSummary(this.#model);
    this.#renderFilters(this.#model);
  }

  #renderSummary({ tripEvents }) {
    new TripInfoView({ tripEvents, container: this.#infoContainer });
  }

  #renderFilters({ filters }) {
    new TripFiltersView({ filters, currentFilter: filters[-1], container: this.#filterContainer });
  }
}
