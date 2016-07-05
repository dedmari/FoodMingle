class OrdersCtrl {
  constructor($http, $scope,  $state, $stateParams, Auth) {
      this.$http                = $http;
      this.$state               = $state;
      this.$stateParams         = $stateParams;
      this.$scope               = $scope;
      this.offer_id             = this.$stateParams.offer_id;
      this.customerId           = Auth.getCurrentUser()._id;
      this.$scope.orderDeleted  = false;
      this.$scope.orderCompleted= false;
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
    addPayment(){
         this.$state.go('payment',{offer_id:this.offer_id}); 
    }
    addNewOrder(){
        var orderUrl                  = '/api/orders';
        this.$scope.order.offer_id    =  this.offer_id;
        this.$scope.order.customer_id =  this.customerId;
        this.$scope.order.status      =  'ordered';
        this.$http.post(orderUrl, this.$scope.order).then(response => {
          this.$state.go('main',{'message':'Order Placed Successfully', 'status':'offer'});
          });   
    }

    deleteOrder(index){
    var offer = {offer_id: this.$scope.Orders[index].offer_id };     
      this.$http.delete('/api/orders/' + this.$scope.Orders[index]._id +'/'+this.$scope.Orders[index].offer_id,offer)
        .then(response => {
          this.$scope.orderDeleted  = true;
          this.$scope.Orders.splice(index, 1);
        });
    }

    completeOrder(index){
    var offer = {offer_id: this.$scope.Orders[index].offer_id };     
      this.$http.put('/api/orders/' + this.$scope.Orders[index]._id)
        .then(response => {
          this.$scope.orderCompleted  = true;
          this.$scope.Orders[index].status = "completed";
        });
    }

  isOrdered(orderStatus)
  {
      console.log(orderStatus)
      if (orderStatus == 'ordered')
      {
        return true;
      }
      else {
        return false;
      }
  }

}


  angular.module('foodmingleApp')
  .controller('OrdersCtrl', OrdersCtrl);

