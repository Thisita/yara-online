import angular from 'angular';
import AuthConfig from './auth.config';

// Create the home module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// Include our UI-Router config settings
authModule.config(AuthConfig);

export default authModule;
