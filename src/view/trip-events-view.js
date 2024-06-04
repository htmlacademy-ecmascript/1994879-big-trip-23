import AbstractView from '../framework/view/abstract-view';
import { render } from '../framework/render';

const createTripEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsView extends AbstractView {
  constructor ({ container }) {
    super();
    render(this, container);
  }

  get template() {
    return createTripEventsListTemplate();
  }
}
