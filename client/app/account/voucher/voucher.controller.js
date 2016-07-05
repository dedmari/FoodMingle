'use strict';
'use strict';

class VoucherController {

  constructor($http, $scope,  $state, $stateParams, multipartForm , Auth, moment) {
    this.Auth 					= Auth;
    this.multipartForm			= multipartForm;
    this.$scope					= $scope;
    this.$state					= $state;
    this.$http					= $http;
    this.moment         		= moment;
    this.$scope.offerAdded      = false;
    this.$stateParams           = $stateParams;
    this.$http.get('/api/vouchers/')
        .then(response => {
          this.$scope.Vouchers = response.data;
          this.$scope.Vouchers.validTill = moment(this.$scope.Vouchers.validTill).format('LLL');
        });
  }


  addNewVoucher(){
  	var uploadUrl = '/api/vouchers';
    this.multipartForm.post(uploadUrl, this.$scope.Voucher);
    this.$state.go('main',{'message':'Voucher Added Successfully', 'status':'offer'});
  }

  updateVoucher(){
    
    var uploadUrl = '/api/vouchers/'+this.$scope.Offer._id;
      this.$scope.Offer.cookId = this.Auth.getCurrentUser()._id;
      this.multipartForm.put(uploadUrl, this.$scope.Offer);
      this.$state.go('main',{'message':'Offer Updated Successfully', 'status':'offer'});

  }

  deleteVoucher(index){        
    this.$http.delete('/api/vouchers/' + this.$scope.Vouchers[index]._id)
      .then(response => {
        this.$scope.voucherDeleted = true;
        this.$scope.Vouchers.splice(index, 1);
      });
      
    }

  convertFormat(date_time){
    return this.moment(date_time).format('LLL');
  }

}

angular.module('foodmingleApp')
  .controller('VoucherController', VoucherController);
