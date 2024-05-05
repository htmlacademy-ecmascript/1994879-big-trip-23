import { render, RenderPosition } from '../framework/render';
import TripFiltersView from '../view/trip-filters-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  constructor ({ container, model }) {
    this.filterContainer = container.filter;
    this.infoContainer = container.info;
    this.model = model;
  }

  init() {
    const tripEvents = this.model.getTripEvents();

    render(new TripInfoView(tripEvents), this.infoContainer, RenderPosition.AFTERBEGIN);
    render(new TripFiltersView(), this.filterContainer);
  }
}
