import EventPresenter from './presenter/event-presenter';
import HeaderPresenter from './presenter/header-presenter';
import TripEventModel from './model/trip-event-model';

const start = () => {
  const eventsElement = document.querySelector('.trip-events');
  const filtersElement = document.querySelector('.trip-controls__filters');
  const headerMainElement = document.querySelector('.trip-main');

  const tripEventModel = new TripEventModel();
  tripEventModel.init();

  const headerPresenter = new HeaderPresenter(
    {
      container: {
        filter: filtersElement,
        info: headerMainElement
      },
      model: tripEventModel
    }
  );
  const eventPresenter = new EventPresenter(
    {
      container: eventsElement,
      model: tripEventModel
    }
  );

  headerPresenter.init();
  eventPresenter.init();
};

start();
