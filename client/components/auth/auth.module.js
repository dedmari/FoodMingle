'use strict';

angular.module('foodmingleApp.auth', ['foodmingleApp.constants', 'foodmingleApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
