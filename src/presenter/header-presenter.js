import { render, RenderPosition } from '../render';
import TripFiltersView from '../view/trip-filters-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  constructor ({ filterContainer, infoContainer, model }) {
    this.filterContainer = filterContainer;
    this.infoContainer = infoContainer;
    this.model = model;
  }

  init() {
    const tripEvents = this.model.getTripEvents();

    render(new TripInfoView(tripEvents), this.infoContainer, RenderPosition.AFTERBEGIN);
    render(new TripFiltersView(), this.filterContainer);
  }
}
