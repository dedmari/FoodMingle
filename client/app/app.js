'use strict';

angular.module('foodmingleApp', ['foodmingleApp.auth', 'foodmingleApp.admin',
    'foodmingleApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io','angularMoment', 'ng-backstretch',
    'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
