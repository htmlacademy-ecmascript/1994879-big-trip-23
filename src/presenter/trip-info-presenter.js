import { UpdateType } from '../const';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #model = null;
  #container = null;
  #tripInfoView = null;

  constructor ({ container, model }) {
    this.#container = container;
    this.#model = model;

    this.#model.addObserver(this.#onModelChange);
  }

  init() {
    this.#renderSummary(this.#model);
  }

  #renderSummary({ tripInfo }) {
    this.#tripInfoView = new TripInfoView({ tripInfo, container: this.#container });
  }

  #onModelChange = (updateType) => {
    if (updateType !== UpdateType.MAJOR) {
      return;
    }
    if (this.#tripInfoView) {
      this.#tripInfoView.destroy();
    }
    this.init();
  };
}
