export default class SearchService {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

    // Object to store results
    this.results = null;
  }

  fetch(query) {
    const route = '/search';
    return this._$http({
      url: `${this._AppConstants}${route}`,
      data: {
        query: query,
      }
    });
  }
}
