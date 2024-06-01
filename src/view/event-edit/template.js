import { EVENT_TYPES, DateFormats, ButtonTypes } from '../../const';
import { displayDateTime } from '../../utils/date';
import { firstLetterUpperCase, getIsCheckedAttr, getIsDisabledAttr } from '../../utils/common';
import { getDestination, getTypedOffers } from '../../model/utils/common';
import he from 'he';

const getTypeItemTemplate = (type, isChecked) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${getIsCheckedAttr(isChecked)}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${firstLetterUpperCase(type)}</label>
  </div>
`;

const getTypesTemplate = (type) => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${EVENT_TYPES.map((eventType) => getTypeItemTemplate(eventType, type === eventType)).join('')}
      </fieldset>
    </div>
  </div>
`;

const getEventDestination = (type, { name: destinationName = '' } = {}, destinations) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('')}
    </datalist>
  </div>`;


const getTimePeriodTemplate = (dateFrom, dateTo) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${displayDateTime(dateFrom, DateFormats.DATE_TIME)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">From</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${displayDateTime(dateTo, DateFormats.DATE_TIME)}">
  </div>
`;

const getPriceTemplate = (price) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(price.toString())}">
  </div>
`;

const getRollupButtonTemplate = (isAdding, isDisabled) => !isAdding
  ? `<button class="event__rollup-btn" type="button" ${getIsDisabledAttr(isDisabled)}>
      <span class="visually-hidden">Open event</span>
    </button>`
  : '';

const getButtonsTemplate = (isAdding, isSaving, isDeleting) => {
  const saveCaption = isSaving ? ButtonTypes.SAVING : ButtonTypes.SAVE;
  const deleteCaption = isDeleting ? ButtonTypes.DELETING : ButtonTypes.DELETE;
  const resetCaption = isAdding ? ButtonTypes.CANCEL : deleteCaption;

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit" ${getIsDisabledAttr(isSaving)}>${saveCaption}</button>
    <button class="event__reset-btn" type="reset" ${getIsDisabledAttr(isDeleting)}>${resetCaption}</button>
    ${getRollupButtonTemplate(isAdding, isSaving || isDeleting)}`;
};

const getOfferItemTemplate = ({id, title, price, type, isSelected}) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}"
      data-offer-id=${id} ${getIsCheckedAttr(isSelected)}>
    <label class="event__offer-label" for="event-offer-${type}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const getOffersTemplate = (offers) => !offers.length ? '' : `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((offer) => getOfferItemTemplate(offer)).join('')}
    </div>
  </section>`;

const getPhotoTapeTemplate = (pictures) => !pictures.length ? '' : `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
    </div>
  </div>`;

const getDestinationTemplate = (destination) => {
  if (!destination) {
    return '';
  }
  const { description, pictures } = destination;
  return !description || !pictures.length ? '' : `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${getPhotoTapeTemplate(pictures)}
    </section>`;
};

const getEventEditTemplate = (tripEvent, offers, destinations) => {
  const { type, dateFrom, dateTo, basePrice, isAdding, isSaving, isDeleting } = tripEvent;
  const eventDestination = getDestination(destinations, tripEvent.destination);
  const { offers: typedOffers } = getTypedOffers(offers, type);
  const tripOffers = typedOffers.map((offer) => ({
    ...offer,
    type: type,
    isSelected: tripEvent.offers.includes(offer.id)
  }));

  return `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getTypesTemplate(type)}
      ${getEventDestination(type, eventDestination, destinations)}
      ${getTimePeriodTemplate(dateFrom, dateTo)}
      ${getPriceTemplate(basePrice)}
      ${getButtonsTemplate(isAdding, isSaving, isDeleting)}
    </header>
    <section class="event__details">
      ${getOffersTemplate(tripOffers)}
      ${getDestinationTemplate(eventDestination)}
    </section>
  </form>`;
};

export { getEventEditTemplate };
