import { getRandomArrayElement, getId, getRandomInt } from './utils';

const SOME_PICTURES_LIMIT = 3;

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Milano'];

const createPicture = (city) => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInt(5)}`,
  description: `${city} photo description`
});

const destinations = CITIES.map((city) =>
  ({
    id: getId(),
    description: `${city} is a beautiful city.`,
    name: `${city}`,
    pictures: Array.from({ length: getRandomInt(SOME_PICTURES_LIMIT) }, createPicture),
  })
);

const getMockedDestinations = () => destinations;
const getRandomDestination = () => getRandomArrayElement(destinations);

export { getMockedDestinations, getRandomDestination };
