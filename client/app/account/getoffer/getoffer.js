'use strict';

angular.module('foodmingleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('getoffer', {
        url: '/getoffer',
        template: '<getoffer></getoffer>'
      });
  });
