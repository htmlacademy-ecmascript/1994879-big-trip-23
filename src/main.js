import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import TripEventModel from './model/trip-event-model';
import TripInfoPresenter from './presenter/trip-info-presenter';
import { Selectors } from './const';

const start = async () => {
  const eventsElement = document.querySelector(Selectors.TRIP_LIST);
  const filtersElement = document.querySelector(Selectors.TRIP_FILTER);
  const headerMainElement = document.querySelector(Selectors.TRIP_INFO);
  const addButtonElement = document.querySelector(Selectors.ADD_BUTTON);

  const tripEventModel = new TripEventModel();
  new TripInfoPresenter({ container: headerMainElement, model: tripEventModel });
  new FilterPresenter({ container: filtersElement, model: tripEventModel });
  new TripPresenter({ container: eventsElement, model: tripEventModel, addButton: addButtonElement });

  await tripEventModel.init();
};

start();
