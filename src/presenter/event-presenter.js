import { render } from '../render';
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
    this.tripEvents = [...this.model.getTripEvents()];
    // this.destinations = [...this.model.getDestinations()];
    // this.offers = [...this.model.getOffers()];

    render(new TripSortView(), this.container);

    const tripEventsList = new TripEventsView();
    render(tripEventsList, this.container);
    render(new EventEditView(this.tripEvents[0]), tripEventsList.getElement());

    for (const tripEvent of this.tripEvents) {
      render(new TripEventView(tripEvent), tripEventsList.getElement());
    }
  }
}
