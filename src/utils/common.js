const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const isEmpty = (list) => list.length === 0;
const getIsCheckedAttr = (isChecked) => isChecked ? 'checked' : '';
const getIsDisabledAttr = (isDisabled) => isDisabled ? 'disabled' : '';

const addItem = (items, item) => Array.from(new Set([...items, item]));
const removeItem = (items, item) => items.filter((it) => it !== item);

const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);

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
  addItem,
  removeItem,
  getInteger
};
