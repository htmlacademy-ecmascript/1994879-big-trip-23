import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #model = null;
  #container = null;
  #infoContainer = null;
  #tripFiltersView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;

    this.init();
    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#renderSummary(this.#model);
  }

  #renderSummary({ tripInfo }) {
    new TripInfoView({ tripInfo, container: this.#infoContainer });
  }

  #onModelChange = () => this.init();
}
