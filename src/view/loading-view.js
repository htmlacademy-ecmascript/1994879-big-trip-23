import AbstractView from '../framework/view/abstract-view';
import { render } from '../framework/render';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingView extends AbstractView {
  constructor ({ container }) {
    super();
    render(this, container);
  }

  get template() {
    return createLoadingTemplate();
  }
}
