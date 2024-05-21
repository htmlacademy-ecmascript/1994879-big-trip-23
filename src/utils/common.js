import { getDateDiff } from './date';

const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const isEmpty = (list) => list.length === 0;
const getIsCheckedAttr = (isChecked) => isChecked ? 'checked' : '';
const getIsDisabledAttr = (isDisabled) => isDisabled ? 'disabled' : '';

const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;
const sortByTime = (eventA, eventB) => getDateDiff(eventB) - getDateDiff(eventA);
const sortByDay = (eventA, eventB) => eventA.dateFrom - eventB.dateFrom;

const getInteger = (str) => {
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : num;
};

export {
  firstLetterUpperCase,
  isEmpty,
  getIsCheckedAttr,
  getIsDisabledAttr,
  updateItem,
  sortByPrice,
  sortByTime,
  sortByDay,
  getInteger
};
