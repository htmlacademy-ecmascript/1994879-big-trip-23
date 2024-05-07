import AbstractView from '../framework/view/abstract-view';

const createTripInfoTemplate = (tripEvents) => {
  const totalPrice = tripEvents.reduce((price, tripEvent) => price + tripEvent.price, 0);

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`;
};

export default class TripInfoView extends AbstractView {
  #tripEvents = null;

  constructor(tripEvents) {
    super();
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoTemplate(this.#tripEvents);
  }
}