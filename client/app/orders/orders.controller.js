class OrdersCtrl {
  constructor($http, $scope,  $state, $stateParams, Auth) {
      this.$http        = $http;
      this.$state       = $state;
      this.$stateParams = $stateParams;
      this.$scope       = $scope;
      this.offer_id     = this.$stateParams.offer_id;
      this.customerId   = Auth.getCurrentUser()._id;
      if(this.offer_id) {
        this.$http.get('/api/cookoffers/'+ this.offer_id)
          .then(response => {
            this.$scope.order = response.data;
          });
      }
      else {
        this.$http.get('/api/orders/'+ this.customerId+'/customeroffers')
          .then(response => {
            this.$scope.Orders = response.data;
          });
      }
  }


    addNewOrder(){
        var orderUrl                  = '/api/orders';
        this.$scope.order.offer_id    =  this.offer_id;
        this.$scope.order.customer_id =  this.customerId;
        this.$scope.order.status      =  'ordered';
        this.$http.post(orderUrl, this.$scope.order).then(response => {
          this.$state.go('main');
          });   
    }

    deleteOrder(index){
    var offer = {offer_id: this.$scope.Orders[index].offer_id };     
      this.$http.delete('/api/orders/' + this.$scope.Orders[index]._id +'/'+this.$scope.Orders[index].offer_id,offer)
        .then(response => {
          this.$scope.Orders.splice(index, 1);
        });
    }

}


  angular.module('foodmingleApp')
  .controller('OrdersCtrl', OrdersCtrl);

