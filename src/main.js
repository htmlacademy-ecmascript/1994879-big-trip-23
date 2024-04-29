import EventPresenter from './presenter/event-presenter';
import { render } from './render';
import TripFiltersView from './view/trip-filters-view';

const start = () => {
  const tripsContainer = document.querySelector('.trip-events');
  const filtersContainer = document.querySelector('.trip-controls__filters');

  const eventPresenter = new EventPresenter(tripsContainer);
  eventPresenter.init();

  render(new TripFiltersView(), filtersContainer);
};

start();
