import TripFiltersView from '../view/trip-filters-view';
import { replace } from '../framework/render';
import { UpdateType } from '../const';
import { getFiltered } from '../model/utils/filter';
import { isEmpty } from '../utils/common';

export default class FilterPresenter {
  #model = null;
  #container = null;
  #tripFiltersView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;
    //this.init();
    this.#model.addObserver(this.#onModelChange);
  }

  get filters() {
    const { filters, tripEvents } = this.#model;
    return filters.map((type) => ({
      type,
      disabled: isEmpty(getFiltered(tripEvents, type))
    }));
  }

  #renderFilters = ({ currentFilter }) => {
    const prevTripFiltersView = this.#tripFiltersView;

    this.#tripFiltersView = new TripFiltersView({
      filters: this.filters,
      currentFilter,
      container: this.#container,
      onFilterChange: this.#onFilterChange
    });

    if (prevTripFiltersView === null) {
      return;
    }

    replace(this.#tripFiltersView, prevTripFiltersView);
    prevTripFiltersView.destroy();
  };

  #onFilterChange = (filterType) => {
    this.#model.setCurrentFilter(UpdateType.MAJOR, filterType);
  };

  #onModelChange = () => this.#renderFilters(this.#model);
}
