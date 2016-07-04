'use strict';

function contactusController() {
  this.message = 'Hello';
}

angular.module('foodmingleApp')
  .controller('ContactusController', contactusController);
