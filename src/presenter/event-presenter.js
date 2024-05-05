import { render, replace } from '../framework/render';
import TripSortView from '../view/trip-sort-view';
import TripEventsView from '../view/trip-events-view';
import TripEventView from '../view/trip-event-view';
import EventEditView from '../view/event-edit-view';

export default class EventPresenter {
  #model = null;
  #container = null;
  #tripEventsView = null;

  constructor ({container, model}) {
    this.#container = container;
    this.#model = model;
    this.#tripEventsView = new TripEventsView();
  }

  init() {
    this.#renderSortView();
    this.#renderTripEvents(this.#model);
  }

  #renderSortView() {
    render(new TripSortView(), this.#container);
  }

  #renderTripEvents({tripEvents}) {
    render(this.#tripEventsView, this.#container);
    tripEvents.forEach((tripEvent) => this.#renderTripEvent(tripEvent));
  }

  #renderTripEvent(tripEvent) {
    const offers = this.#model.offers;
    const destinations = this.#model.destinations;

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        switchToViewMode();
      }
    };

    const onEditClick = () => switchToEditMode();
    const onFormSubmit = () => switchToViewMode();
    const onFormCancel = () => switchToViewMode();

    const tripEventView = new TripEventView({
      tripEvent,
      offers,
      destinations,
      onEditClick: onEditClick,
    });

    const eventEditView = new EventEditView({
      tripEvent,
      offers,
      destinations,
      onFormSubmit: onFormSubmit,
      onFormCancel: onFormCancel,
    });

    function switchToEditMode() {
      replace(eventEditView, tripEventView);
      document.addEventListener('keydown', onEscKeydown);
    }

    function switchToViewMode() {
      replace(tripEventView, eventEditView);
      document.removeEventListener('keydown', onEscKeydown);
    }

    render(tripEventView, this.#tripEventsView.element);
  }

}
