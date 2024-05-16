import AbstractView from '../framework/view/abstract-view';
import { render } from '../framework/render';
import { firstLetterUpperCase } from '../utils/common';
import { getIsCheckedAttr, getIsDisabledAttr } from '../utils/common';

const createSortItemTemplate = (type, isChecked, isDisabled) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${type}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}>
    <label class="trip-sort__btn" for="sort-${type}">${firstLetterUpperCase(type)}</label>
  </div>
`;

const createSortingTemplate = (sortTypes, currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map(({ type, disabled }) => createSortItemTemplate(type, type === currentSortType, disabled)).join('')}
  </form>
`;

export default class TripSortView extends AbstractView {
  #sortTypes = [];
  #currentSort = '';
  #sortTypeChangeHandler = null;

  constructor({ sortTypes, currentSort, container, onSortTypeChange }) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSort = currentSort;
    this.#sortTypeChangeHandler = onSortTypeChange;
    render(this, container);

    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  get template() {
    return createSortingTemplate(this.#sortTypes, this.#currentSort);
  }

  removeElement() {
    this.element.removeEventListener('change', this.#onSortTypeChange);
    super.removeElement();
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    this.#sortTypeChangeHandler(evt.target.value.replace('sort-', ''));
  };

}
