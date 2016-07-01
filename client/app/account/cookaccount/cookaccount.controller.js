'use strict';

class CookaccountController {

  constructor(Auth) {
    this.Auth = Auth;
  }

}

angular.module('foodmingleApp')
  .controller('CookaccountController', CookaccountController);
