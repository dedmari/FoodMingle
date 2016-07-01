'use strict';

class GetoffersCtrl{
  constructor($http, $scope,  $state, $stateParams,multipartForm ,Auth) {
    this.$http        = $http;
    this.$state       = $state;
    this.$stateParams = $stateParams;
    this.$scope       = $scope;   
    console.log("state parameters   " + this.$stateParams.offer_id);
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
            { 'offer_id': '1',
            'dishname':'2',
            'pricedish':'3',
            'email':'4',
            'offer_date':'offer.date_time',
            'quantity':'offer.quantity',
            'address':'offer.address',
            'dishimage':'offer.dishimage',
            'active':'offer.active' });
    }

  addNewOffer(){
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer)
    }
  } 
  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
