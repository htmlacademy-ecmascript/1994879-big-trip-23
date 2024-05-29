import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripEventModel from './model/trip-event-model';
//import TripInfoPresenter from './presenter/trip-info-presenter';

const start = async () => {
  const eventsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const headerMainElement = document.querySelector('.trip-main');

  const tripEventModel = new TripEventModel();
  await tripEventModel.init();
  //new TripInfoPresenter({ container: headerMainElement, model: tripEventModel });
  new FilterPresenter({ container: filtersElement, model: tripEventModel });
  new TripPresenter({ container: eventsElement, model: tripEventModel });
};

start();
