import MainController from './controllers/MainController';
import SearchService from './services/SearchService';

angular
  .module('app', [])
  .controller('mainController', MainController)
  .service('searchService', SearchService);
