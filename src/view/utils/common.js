const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const isEmpty = (list) => list.length === 0;
const getIsCheckedAttr = (isChecked) => isChecked ? 'checked' : '';
const getIsDisabledAttr = (isDisabled) => isDisabled ? 'disabled' : '';

export { firstLetterUpperCase, isEmpty, getIsCheckedAttr, getIsDisabledAttr };
