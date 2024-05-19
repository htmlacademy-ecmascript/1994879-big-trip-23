import ApiService from '../framework/api-service';
import { ApiMethod, ApiRoute } from './const';
import { toCamelCaseKeys, toSnakeCaseKeys } from './utils';

export default class TripApiService extends ApiService {
  getPoints = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.POINTS, method: ApiMethod.GET })
  );

  addPoint = async (point) => ApiService.parseResponse(
    await this._load({
      url: ApiRoute.POINTS,
      method: ApiMethod.POST,
      body: TripApiService.adaptToServer(point),
      headers: new Headers({'Content-Type': 'application/json'})
    })
  );

  updatePoint = async (point) => ApiService.parseResponse(
    await this._load({
      url: this.#getRoutePointId(point),
      method: ApiMethod.PUT,
      body: TripApiService.adaptToServer(point),
      headers: new Headers({'Content-Type': 'application/json'})
    })
  );

  deletePoint = async (point) => await this._load({ url: this.#getRoutePointId(point), method: ApiMethod.DELETE });

  getOffers = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.OFFERS, method: ApiMethod.GET })
  );

  getDestinations = async () => ApiService.parseResponse(
    await this._load({ url: ApiRoute.DESTINATIONS, method: ApiMethod.GET })
  );

  #getRoutePointId = ({ id }) => `${ApiRoute.POINTS}/${id}`;

  static adaptToServer = (tripEvent) => toSnakeCaseKeys(tripEvent);

  static adaptToClient = (point) => {
    const { dateFrom, dateTo, ...rest } = toCamelCaseKeys(point);
    return {
      ...rest,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
    };
  };
}
