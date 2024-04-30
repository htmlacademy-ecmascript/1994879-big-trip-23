import { render } from '../render';
import TripFiltersView from '../view/trip-filters-view';

export default class HeaderPresenter {
  constructor ({ filterContainer, infoContainer } ) {
    this.filterContainer = filterContainer;
    this.infoContainer = infoContainer;
  }

  init() {
    render(new TripFiltersView(), this.filterContainer);
  }
}
