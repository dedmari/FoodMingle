'use strict';

class CookaccountController {

  constructor(Auth) {
    this.Auth = Auth;
    
    console.log(Auth.getCurrentUser()._id);
    console.log(Auth.getCurrentUser().name);
    
  }

  // changePassword(form) {
  //   this.submitted = true;

  //   if (form.$valid) {
  //     this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
  //       .then(() => {
  //         this.message = 'Password successfully changed.';
  //       })
  //       .catch(() => {
  //         form.password.$setValidity('mongoose', false);
  //         this.errors.other = 'Incorrect password';
  //         this.message = '';
  //       });
  //   }
  // }
}

angular.module('foodmingleApp')
  .controller('CookaccountController', CookaccountController);

