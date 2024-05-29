import TripFiltersView from '../view/trip-filters-view';
import { replace } from '../framework/render';
import { UpdateType } from '../const';

export default class FilterPresenter {
  #model = null;
  #container = null;
  #tripFiltersView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;
    this.init();
    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#renderFilters(this.#model);
  }

  #renderFilters({ filters, currentFilter }) {
    const prevTripFiltersView = this.#tripFiltersView;

    this.#tripFiltersView = new TripFiltersView({
      filters,
      currentFilter,
      container: this.#container,
      onFilterChange: this.#onFilterChange
    });

    if (prevTripFiltersView === null) {
      return;
    }

    replace(this.#tripFiltersView, prevTripFiltersView);
    prevTripFiltersView.destroy();
  }

  #onFilterChange = (filterType) => {
    this.#model.setCurrentFilter(UpdateType.MAJOR, filterType);
  };

  #onModelChange = () => this.init();
}
