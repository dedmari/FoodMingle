'use strict';

angular.module('foodmingleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        template: '<orders></orders>'
      });
  });
