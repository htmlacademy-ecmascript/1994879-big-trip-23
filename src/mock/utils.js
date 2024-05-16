import dayjs from 'dayjs';

const SELECTED_OFFERS_LIMIT = 3;

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomBoolean = () => Math.random() < 0.5;
const getRandomInt = (max) => Math.round(Math.random() * max);
const getId = () => `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;

const getDateWithRandomTime = (date) => dayjs(date).add(getRandomInt(1000), 'minute');

export { getRandomArrayElement, getRandomBoolean, getRandomInt, getId, getDateWithRandomTime, SELECTED_OFFERS_LIMIT };
