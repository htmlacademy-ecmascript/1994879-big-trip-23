const firstLetterUpperCase = (word) => {
  const [firstLetter,...rest] = word;
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const isEmpty = (list) => list.length === 0;
const calculateChecked = (isChecked) => isChecked ? 'checked' : '';

export { firstLetterUpperCase, isEmpty, calculateChecked };
