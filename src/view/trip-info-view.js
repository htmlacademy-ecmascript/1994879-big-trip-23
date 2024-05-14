import AbstractView from '../framework/view/abstract-view';
import { render, RenderPosition } from '../framework/render';
import { displayDateTime } from '../utils/date';
import { DateFormats } from '../const';

const createTripInfoTemplate = ({ start, middle, end, dateFrom, dateTo, cost }) => {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${start} &mdash; ${middle} &mdash; ${end}</h1>

        <p class="trip-info__dates">${displayDateTime(dateFrom, DateFormats.DAY_MONTH)}
          &nbsp;&mdash;&nbsp;${displayDateTime(dateTo, DateFormats.DAY_MONTH)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;
};

export default class TripInfoView extends AbstractView {
  #tripInfo = null;

  constructor({ tripInfo, container }) {
    super();
    this.#tripInfo = tripInfo;
    render(this, container, RenderPosition.AFTERBEGIN);
  }

  get template() {
    return createTripInfoTemplate(this.#tripInfo);
  }
}
