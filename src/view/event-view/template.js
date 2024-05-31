import { displayDate, displayDateMonth, displayTime, displayDateTime, displayDuration } from '../../utils/date';
import { isEmpty } from '../../utils/common';
import he from 'he';

const getEventScheduleTemplate = (dateFrom, dateTo) => `
  <div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime="${displayDateTime(dateFrom)}">${displayTime(dateFrom)}</time>
    &mdash;
    <time class="event__end-time" datetime="${displayDateTime(dateTo)}">${displayTime(dateTo)}</time>
  </p>
  <p class="event__duration">${displayDuration(dateFrom, dateTo)}</p>
</div>
`;

const getOffersTemplate = (offers) => isEmpty(offers) ? '' :
  offers.map(({ title, price }) => `
    <li class="event__offer">
      <span class="event__offer-title">${he.encode(title)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${he.encode(price.toString())}</span>
    </li>
    `).join('');

const getTripEventTemplate = (tripEvent, offers, destinations) => {
  const {type, dateFrom, dateTo, basePrice, isFavorite} = tripEvent;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const {name: destinationName} = destinations.find((destination) => destination.id === tripEvent.destination);
  const {offers: typedOffers} = offers.find((offer) => offer.type === type);
  const selectedOffers = typedOffers.filter((offer) => tripEvent.offers.includes(offer.id));

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${displayDate(dateFrom)}">${displayDateMonth(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${he.encode(destinationName)}</h3>
      ${getEventScheduleTemplate(dateFrom, dateTo)}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getOffersTemplate(selectedOffers)}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export { getTripEventTemplate };
