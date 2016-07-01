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
    if(!(this.$stateParams.offer_id)){
      this.$http.get('/api/cookoffers/'+ cookId+'/offers')
      .then(response => {
          this.$scope.cookoffers = response.data;          
        });
    }
  }


  deleteOffer(index){        
    this.$http.delete('/api/cookoffers/' + this.$scope.cookoffers[index]._id)
      .then(response => {
        this.$scope.cookoffers.splice(index, 1);
      });
      
    }

  editOffer(index){     
    this.$state.go('updateoffer', 
          { 'offer_id': this.$scope.cookoffers[index]._id,
          'dishname':this.$scope.cookoffers[index].dishname,
          'pricedish':this.$scope.cookoffers[index].pricedish,
          'email':this.$scope.cookoffers[index].email,
          'offer_date':this.$scope.cookoffers[index].offer_date,
          'quantity':this.$scope.cookoffers[index].quantity,
          'address':this.$scope.cookoffers[index].address,
          'dishimage':this.$scope.cookoffers[index].dishimage,
          'active':this.$scope.cookoffers[index].active });
  }

  updateOffer(){

    

  }
  addNewOffer(){
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer)
    }
  } 
  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
