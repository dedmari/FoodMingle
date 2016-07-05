'use strict';

angular.module('foodmingleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('voucher', {
        url: '/voucher',
        template: '<voucher></voucher>'
      });
  });
