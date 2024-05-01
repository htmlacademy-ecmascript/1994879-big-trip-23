import { EVENT_TYPES } from '../const';
import { getRandomArrayElement, getId, getRandomInt } from './utils';

const offerTitles = ['Order meal', 'Infotainment system', 'Choose seats', 'Book a taxi at the arrival point', 'Wake up at a certain time'];

const createOffer = () => ({
  id: getId(),
  title: getRandomArrayElement(offerTitles),
  price: getRandomInt(500)
});

const offers = EVENT_TYPES.map((eventType) => ({
  type: eventType,
  offers: Array.from({ length: getRandomInt(6)}, createOffer),
})
);

const getMockedOffers = () => offers;
const getRandomOffer = () => getRandomArrayElement(offers);

export { getMockedOffers, getRandomOffer };
