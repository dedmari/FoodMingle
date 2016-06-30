'use strict';

class GetoffersCtrl{
  constructor($http, $scope,  $state, $stateParams,multipartForm ,Auth) {
    this.$http        = $http;
    this.$state       = $state;
    this.$stateParams = $stateParams;
    this.$scope       = $scope;   
    this.Auth = Auth;
    this.multipartForm=multipartForm;
    var cookId = Auth.getCurrentUser()._id;
    this.$http.get('/api/cookoffers/'+ cookId)
   .then(response => {
          this.$scope.cookId = response.data;          
        });
  }

  deleteOffer(index){        
    this.$http.delete('/api/cookoffers/' + this.$scope.cookoffers[index]._id)
      .then(response => {
        this.$scope.cookId.splice(index, 1);
      });
      
    }

  addNewOffer(){
      console.log(this.Auth.getCurrentUser().name);
      var uploadUrl = '/api/cookoffers';
      $scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer)
    }
  } 
  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
