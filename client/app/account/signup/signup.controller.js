'use strict';

class SignupController {
  //end-non-standard

  constructor(Auth, $state) {
      this.Auth = Auth;
      this.$state = $state;
      this.getCurrentUser = Auth.getCurrentUser;
    }
    //start-non-standard


  register(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.createUser({
          name:     this.user.name,
          email:    this.user.email,
          password: this.user.password,
          role:     this.user.role
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }


  update(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.updateProfile(this.user.name, this.user.email , this.user.role)
        .then(() => {
          this.Auth.logout();
          this.$state.go('main',{'message':'Profile Updated Successfully', 'status':'offer'});
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

angular.module('foodmingleApp')
  .controller('SignupController', SignupController);
