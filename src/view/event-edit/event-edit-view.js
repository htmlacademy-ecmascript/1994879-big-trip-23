import { BLANK_TRIP_EVENT, DefaultFlatpickrConfig } from '../../const';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { remove } from '../../framework/render';
import { getInteger, addItem, removeItem } from '../../utils/common';
import { getEventEditTemplate } from './template';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EventEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #submitHandler = null;
  #deleteHandler = null;
  #cancelHandler = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({tripEvent = BLANK_TRIP_EVENT, offers, destinations, onFormSubmit, onFormDelete, onFormCancel}) {
    super();
    this._setState(EventEditView.parseEventToState(tripEvent));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#submitHandler = onFormSubmit;
    this.#deleteHandler = onFormDelete;
    this.#cancelHandler = onFormCancel;

    this._restoreHandlers();
  }

  get template() {
    return getEventEditTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#getResetHandler());
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);

    const availableOffers = this.element.querySelector('.event__available-offers');
    if (availableOffers) {
      availableOffers.addEventListener('change', this.#onOfferClick);
    }
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#onCancelForm);
    }

    this.#setDatePickers({
      startTimeElement: this.element.querySelector('#event-start-time-1'),
      endTimeElement: this.element.querySelector('#event-end-time-1')
    });
  }

  reset = (tripEvent) => this.updateElement(tripEvent);
  destroy = () => remove(this);

  removeElement = () => {
    this.#dateFromPicker.destroy();
    this.#dateFromPicker = null;
    this.#dateToPicker.destroy();
    this.#dateToPicker = null;

    super.removeElement();
  };

  #getResetHandler = () => this._state.isAdding ? this.#onCancelForm : this.#onDeleteForm;

  #setDatePickers = ({ startTimeElement, endTimeElement }) => {
    this.#dateFromPicker = flatpickr(
      startTimeElement,
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#onDateFromChange,
      },
    );

    this.#dateToPicker = flatpickr(
      endTimeElement,
      {
        ...DefaultFlatpickrConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onDateToChange,
      },
    );
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#submitHandler(EventEditView.parseStateToEvent(this._state));
  };

  #onDeleteForm = (evt) => {
    evt.preventDefault();
    this.#deleteHandler(EventEditView.parseStateToEvent(this._state));
  };

  #onCancelForm = (evt) => {
    evt.preventDefault();
    this.#cancelHandler();
  };

  #onTypeChange = (evt) => {
    const type = evt.target.value;
    if (this._state.type === type) {
      return;
    }
    this.updateElement({ type, offers: [] });
  };

  #onDestinationChange = (evt) => {
    const destination = this.#destinations.find(({ name }) => name === evt.target.value);
    if (!destination || this._state.destination === destination.id) {
      return;
    }
    this.updateElement({ destination: destination.id });
  };

  #onPriceInput = (evt) => {
    evt.target.value = getInteger(evt.target.value);
  };

  #onPriceChange = (evt) => {
    const price = getInteger(evt.target.value);
    this.updateElement({ basePrice: price });
  };

  #onDateFromChange = ([date]) => {
    this.updateElement({ dateFrom: date });
  };

  #onDateToChange = ([date]) => {
    this.updateElement({ dateTo: date });
  };

  #onOfferClick = (evt) => {
    const { dataset: { offerId }, checked } = evt.target;
    const offers = checked
      ? addItem(this._state.offers, offerId)
      : removeItem(this._state.offers, offerId);

    this.updateElement({ offers });
  };

  static parseEventToState = (tripEvent) => ({
    ...tripEvent,
    isAdding: !tripEvent.id,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToEvent = (state) => {
    const tripEvent = {...state};
    delete tripEvent.isAdding;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;
    return tripEvent;
  };
}
