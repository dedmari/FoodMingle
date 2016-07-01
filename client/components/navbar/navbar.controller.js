'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn 	= Auth.isLoggedIn;
    this.isCook 		= Auth.isCook;
    this.isCustomer 	= Auth.isCustomer;
    this.getCurrentUser = Auth.getCurrentUser;
  }

}

angular.module('foodmingleApp')
  .controller('NavbarController', NavbarController);
