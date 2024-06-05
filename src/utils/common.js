const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const isEmpty = (list) => list.length === 0;
const getIsCheckedAttr = (isChecked) => isChecked ? 'checked' : '';
const getIsDisabledAttr = (isDisabled) => isDisabled ? 'disabled' : '';

const addItem = (items, newItem) => Array.from(new Set([...items, newItem]));
const removeItem = (items, itemToRemove) => items.filter((item) => item !== itemToRemove);

const getInteger = (input) => {
  const parsedNumber = parseInt(input.replace(/\D/g, ''), 10);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

const isEscKeydown = (evt) => evt.key === 'Escape';

export {
  firstLetterUpperCase,
  isEmpty,
  getIsCheckedAttr,
  getIsDisabledAttr,
  addItem,
  removeItem,
  getInteger,
  isEscKeydown
};
