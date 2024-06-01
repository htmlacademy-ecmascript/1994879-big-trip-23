const getDestinationName = (destinations, destinationId) => {
  const currentDestination = destinations.find((destination) => destination.id === destinationId);
  return currentDestination ? currentDestination.name : '';
};

const getTripInfo = (tripEvents, destinations, offers) => {
  const first = tripEvents[0];
  const last = tripEvents[tripEvents.length - 1];
  const middle = tripEvents.slice(1, -1);
  const middleDestination = middle.length === 1 ? getDestinationName(destinations, middle[0]?.destination) : '...';
  return {
    start: getDestinationName(destinations, first?.destination),
    middle: middleDestination,
    end: getDestinationName(destinations, last?.destination),
    dateFrom: first?.dateFrom,
    dateTo: last?.dateTo,
    cost: tripEvents.reduce((price, tripEvent) => price + tripEvent.basePrice, 0),
  };
};

export { getTripInfo };
