'use strict';

(function() {

  class AdminController {
    constructor(User,$scope) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.$scope = $scope;
      this.$scope.userDeleted = false;
    }

    delete(user) {
      user.$remove();
      this.$scope.userDeleted = true;
      this.users.splice(this.users.indexOf(user), 1);
    }
    isAdmin(role){
      if(role == 'admin')
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  angular.module('foodmingleApp.admin')
    .controller('AdminController', AdminController);
})();
