'use strict';

class GetoffersCtrl{
  constructor($http, $scope,  $state, $stateParams,multipartForm , Auth) {
    this.$http        = $http;
    this.$state       = $state;
    this.$stateParams = $stateParams;
    this.$scope       = $scope;   
    this.Auth = Auth;
    this.multipartForm=multipartForm;
    this.$scope.submit = false;
    this.$scope.update = false;
    var cookId = Auth.getCurrentUser()._id;
    if(!(this.$stateParams.offer_id)){
      this.$scope.submit = true;
      this.$http.get('/api/cookoffers/'+ cookId+'/offers')
      .then(response => {
          this.$scope.cookoffers = response.data;          
        });
    }
    else {
      this.$scope.update = true;
      this.$http.get('/api/cookoffers/'+ this.$stateParams.offer_id)
        .then(response => {
          this.$scope.Offer = response.data;
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
          { 'offer_id': this.$scope.cookoffers[index]._id});
  }

  updateOffer(){
    
    var uploadUrl = '/api/cookoffers/'+this.$scope.Offer._id;
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.put(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Updated Successfully', 'status':'offer'});

  }
  addNewOffer(){
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Placed Successfully', 'status':'offer'});
    }

    isOrdered(offerStatus)
    {
        if (offerStatus == 'ordered')
        {
          return true;
        }
        else {
          return false;
        }
    }
  } 


  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
