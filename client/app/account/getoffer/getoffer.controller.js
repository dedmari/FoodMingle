'use strict';

class GetoffersCtrl{
  constructor($http, $scope,  $state, $stateParams,multipartForm , Auth, moment,socket) {
    this.$http                = $http;
    this.$state               = $state;
    this.$stateParams         = $stateParams;
    this.$scope               = $scope;   
    this.Auth                 = Auth;
    this.multipartForm        = multipartForm;
    this.$scope.submit        = false;
    this.$scope.update        = false;
    this.$scope.offerDeleted  = false;
    this.$scope.submitted     = false;
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
          this.$scope.Offer.date_time = moment(this.$scope.Offer.date_time).format();
          this.$scope.Offer.date_time = new Date(this.$scope.Offer.date_time);
        });
    }

    this.$http.get('/api/cookoffers')
        .then(response => {
          this.$scope.cookoffers  = response.data;
        });
  }
 
      

  deleteOffer(index){        
    this.$http.delete('/api/cookoffers/' + this.$scope.cookoffers[index]._id)
      .then(response => {
        this.$scope.offerDeleted = true;
        this.$scope.cookoffers.splice(index, 1);
      });
      
    }

  editOffer(index){     
    this.$state.go('updateoffer', 
          { 'offer_id': this.$scope.cookoffers[index]._id});
  }

viewOffer(offer){
  this.$state.go('offerinfo', 
    { 'offer_id': offer._id,
    'dishname':offer.dishname,
    'pricedish':offer.pricedish,
    'email':offer.email,
    'offer_date':offer.date_time,
    'quantity':offer.quantity,
    'address':offer.address,
    'dishimage':offer.dishimage,
    'active':offer.active });
    }
    

  updateOffer(){
    this.$scope.submitted =true;
    var uploadUrl = '/api/cookoffers/'+this.$scope.Offer._id;
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.put(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Updated Successfully', 'status':'offer'});

  }
  addNewOffer(form){
    this.$scope.submitted =true;
    if (form.$valid) {
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Placed Successfully', 'status':'offer'});
    }
      
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
