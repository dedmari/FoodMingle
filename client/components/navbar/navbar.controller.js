'use strict';

class NavbarController {
 
  constructor(Auth) {
    this.isLoggedIn 	= Auth.isLoggedIn;
    this.isCook 		= Auth.isCook;
    this.isAdmin 		= Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

}

angular.module('foodmingleApp')
  .controller('NavbarController', NavbarController);
