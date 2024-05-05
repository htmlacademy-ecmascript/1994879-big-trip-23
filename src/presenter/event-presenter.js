import { render } from '../framework/render';
import TripSortView from '../view/trip-sort-view';
import EventEditView from '../view/event-edit-view';
import TripEventView from '../view/trip-event-view';
import TripEventsView from '../view/trip-events-view';

export default class EventPresenter {
  constructor ({container, model}) {
    this.container = container;
    this.model = model;
  }

  init() {
    const tripEvents = this.model.getTripEvents();
    const offers = this.model.getOffers();
    const destinations = this.model.getDestinations();

    render(new TripSortView(), this.container);

    const tripEventsList = new TripEventsView();
    render(tripEventsList, this.container);
    render(new EventEditView(tripEvents[0], offers, destinations), tripEventsList.element);

    tripEvents.forEach((tripEvent) => render(new TripEventView(tripEvent, offers, destinations), tripEventsList.element));
  }
}
