import { render } from '../framework/render';
import TripSortView from '../view/trip-sort-view';
import TripEventView from '../view/trip-event-view';
import TripEventsView from '../view/trip-events-view';

export default class EventPresenter {
  #model = null;
  #container = null;

  constructor ({container, model}) {
    this.#container = container;
    this.#model = model;
  }

  init() {
    this.#renderSortView();
    this.#renderTripEvents(this.#model);
  }

  #renderSortView() {
    render(new TripSortView(), this.#container);
  }

  #renderTripEvents({tripEvents, offers, destinations}) {
    const tripEventsList = new TripEventsView();
    render(tripEventsList, this.#container);
    tripEvents.forEach((tripEvent) => render(new TripEventView(tripEvent, offers, destinations), tripEventsList.element));
  }
}
