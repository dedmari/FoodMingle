'use strict';

angular.module('foodmingleApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>',
      params:      {'message': null,'status':null}
    });
  });
