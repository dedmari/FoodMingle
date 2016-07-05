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
    this.$scope.submit 			= false;
    this.$scope.update 			= false;
    if(!(this.$stateParams.voucher_id)){
      this.$scope.submit = true;
      this.$http.get('/api/vouchers/')
        .then(response => {
          this.$scope.Vouchers = response.data;
          this.$scope.Vouchers.validTill = moment(this.$scope.Vouchers.validTill).format('LLL');
        });
    }
    else {
      	this.$scope.update = true;
      	this.$http.get('/api/vouchers/'+ this.$stateParams.voucher_id)
        .then(response => {
          this.$scope.Voucher 			= response.data;
          this.$scope.Voucher.validTill = moment(this.$scope.Voucher.validTill).format();
          this.$scope.Voucher.validTill = new Date(this.$scope.Voucher.validTill);
        });
    }
    
  }


  addNewVoucher(){
  	var uploadUrl = '/api/vouchers';
    this.multipartForm.post(uploadUrl, this.$scope.Voucher);
    this.$state.go('main',{'message':'Voucher Added Successfully', 'status':'offer'});
  }

  editVoucher(index){     
    this.$state.go('updateVoucher', 
          { 'voucher_id': this.$scope.Vouchers[index]._id});
  }
  updateVoucher(){
    
    var uploadUrl = '/api/vouchers/'+this.$scope.Voucher._id;
      this.multipartForm.put(uploadUrl, this.$scope.Voucher);
      this.$state.go('main',{'message':'Voucher Updated Successfully', 'status':'offer'});

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
