import { createElement } from '../render';

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant' ];
const OFFER_TYPES = [
  {type: 'luggage', prefix: 'Add'},
  {type: 'comfort', prefix: 'Switch to'},
  {type: 'meal', prefix: 'Add'},
  {type: 'seats', prefix: 'Choose'},
  {type: 'train', prefix: 'Travel by'},
];

const TimePeriod = {
  START: 'start',
  END: 'end',
};

const createEventTypeItemTemplate = (type) => {
  const lowerType = type.toLowerCase();
  return `
  <div class="event__type-item">
    <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
    <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
  </div>`;
};

const createEventTimeTemplate = (type, value) => `
  <label class="visually-hidden" for="event-${type}-time-1">From</label>
  <input class="event__input  event__input--time" id="event-${type}-time-1" type="text" name="event-${type}-time" value="${value}">`;

const createEventTimePeriodTemplate = (timeStart, timeEnd) => `
  <div class="event__field-group  event__field-group--time">
    ${createEventTimeTemplate(TimePeriod.START, timeStart)}
    &mdash;
    ${createEventTimeTemplate(TimePeriod.END, timeEnd)}
  </div>
`;

const createOfferItemTemplate = ({type, prefix}, checked = '') => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${checked}>
    <label class="event__offer-label" for="event-offer-${type}-1">
      <span class="event__offer-title">${prefix} ${type}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">50</span>
    </label>
  </div>
  `;

const createDestinationTemplate = () => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
      </div>
    </div>
  </section>
  `;

const createEventEditTemplate = (withDestination = false) => `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((type) => createEventTypeItemTemplate(type)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      ${createEventTimePeriodTemplate('18/03/19 12:25', '18/03/19 13:35')}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${OFFER_TYPES.map((type) => createOfferItemTemplate(type)).join('')}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
      </section>

      ${withDestination ? createDestinationTemplate() : ''}
    </section>
  </form>
`;

export default class EventEditView {
  getTemplate() {
    return createEventEditTemplate(true);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
