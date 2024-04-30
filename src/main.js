import EventPresenter from './presenter/event-presenter';
import HeaderPresenter from './presenter/header-presenter';

const start = () => {
  const eventsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const headerMainElement = document.querySelector('.trip-main');

  const headerPresenter = new HeaderPresenter( { filterContainer: filtersElement, infoContainer: headerMainElement } );
  const eventPresenter = new EventPresenter(eventsElement);

  headerPresenter.init();
  eventPresenter.init();
};

start();
