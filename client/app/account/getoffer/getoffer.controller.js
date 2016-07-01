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
    this.$http.get('/api/cookoffers/'+ cookId+'/offers')
   .then(response => {
          console.log(response.data);
          this.$scope.cookoffers = response.data;          
        });
  }

  deleteOffer(index){        
    this.$http.delete('/api/cookoffers/' + this.$scope.cookoffers[index]._id)
      .then(response => {
        this.$scope.cookoffers.splice(index, 1);
      });
      
    }

  addNewOffer(){
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer)
    }
  } 
  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
