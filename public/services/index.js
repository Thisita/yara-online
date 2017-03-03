import angular from 'angular';
import SearchService from './search.service';

// Create the module where are functionality can attach to
let servicesModule = angular.module('app.services', []);

// Services
servicesModule.service('SearchService', SearchService);

export default servicesModule;
