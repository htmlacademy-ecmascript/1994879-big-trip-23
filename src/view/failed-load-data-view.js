import AbstractView from '../framework/view/abstract-view';

const createFailedLoadTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class FailedLoadDataView extends AbstractView {
  constructor ({ container }) {
    super();
    render(this, container);
  }

  get template() {
    return createFailedLoadTemplate();
  }
}
