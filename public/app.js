import angular from 'angular';

// Import our app config files
import constants from './config/app.constants';
import appConfig from './config/app.config';
import appRun from './config/app.run';

// Import our app functionality
import './layout';
import './components';
import './home';
import './profile';
import './yaraRule';
import './services';
import './auth';

// Create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.profile',
  'app.yaraRule',
  'app.services',
  'app.auth',
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);
angular.module('app').config(appConfig);
angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true,
});
