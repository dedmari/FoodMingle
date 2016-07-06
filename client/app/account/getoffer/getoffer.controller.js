'use strict';

class GetoffersCtrl{
  constructor($http, $scope,  $state, $stateParams,multipartForm , Auth, moment, $q) {
    this.$http                = $http;
    this.$state               = $state;
    this.$stateParams         = $stateParams;
    this.$scope               = $scope;   
    this.Auth                 = Auth;
    this.multipartForm        = multipartForm;
    this.$scope.submit        = false;
    this.$scope.update        = false;
    this.$scope.offerDeleted  = false;
    this.moment               = moment;
    var cookId = Auth.getCurrentUser()._id;
      this.$http.get('/api/cookoffers/')
      .then(response => {
          var defer = $q.defer();
          this.$scope.cookoffers = response.data;
          defer.resolve(this.$scope.cookoffers);          
        });
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

  updateOffer(form){
    var uploadUrl = '/api/cookoffers/'+this.$scope.Offer._id;
      console.log(uploadUrl);
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.put(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Updated Successfully', 'status':'offer'});

  }
  addNewOffer(form){
      var uploadUrl = '/api/cookoffers';
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.post(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Placed Successfully', 'status':'offer'});
    }

    formSubmitted(form){
      this.$scope.submitted =true;
      if (form.$valid) {
        if (this.$scope.submit == true){
            this.addNewOffer(form)
        }
        else if(this.$scope.update == true){
          this.updateOffer(form)
        }
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
  isCompleted(offerStatus)
  {
      if (offerStatus == 'completed')
      {
        return true;
      }
      else {
        return false;
      }
  }
  convertFormat(date_time){
    return this.moment(date_time).format('LLL');
  }
} 


  angular.module('foodmingleApp')
  .controller('GetoffersCtrl', GetoffersCtrl);
