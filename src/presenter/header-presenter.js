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
    this.#renderFilters();
  }

  #renderSummary(tripEvents) {
    render(new TripInfoView(tripEvents), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(new TripFiltersView(), this.#filterContainer);
  }
}
