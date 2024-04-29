import { render } from '../render';
import TripSortView from '../view/trip-sort-view';
import EventEditView from '../view/event-edit-view';
import TripEventView from '../view/trip-event-view';
import TripEventsView from '../view/trip-events-view';

export default class EventPresenter {
  constructor (container) {
    this.container = container;
  }

  init() {
    render(new TripSortView(), this.container);

    const eventsList = new TripEventsView();
    render(eventsList, this.container);
    render(new EventEditView(), eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), eventsList.getElement());
    }
  }
}
