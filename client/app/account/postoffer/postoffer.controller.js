'use strict';

class PostofferController {

  constructor(Auth) {
    this.Auth = Auth;
    
  }
  	post(form) {
  		alert( this.Auth);
  	}
}

angular.module('foodmingleApp')
  .controller('PostofferController', PostofferController);