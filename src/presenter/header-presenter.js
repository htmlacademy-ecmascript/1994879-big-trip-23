import { render, RenderPosition } from '../framework/render';
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
    this.#renderSummary(this.#model.tripEvents);
    this.#renderFilters(this.#model.filters);
  }

  #renderSummary(tripEvents) {
    render(new TripInfoView(tripEvents), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters(filters) {
    render(new TripFiltersView({filters, currentFilter: filters[-1]}), this.#filterContainer);
  }
}
