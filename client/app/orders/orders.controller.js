class OrdersCtrl {
  constructor($http, $scope,  $state, $stateParams, Auth, moment) {
      this.$http                = $http;
      this.$state               = $state;
      this.$stateParams         = $stateParams;
      this.$scope               = $scope;
      this.offer_id             = this.$stateParams.offer_id;
      this.customerId           = Auth.getCurrentUser()._id;
      this.moment               = moment;
      this.$scope.orderDeleted  = false;
      this.$scope.orderCompleted= false;
      this.$scope.submitted     = false;
      //this.$scope.allOrder      ={};

      // this.$http.get('/api/orders/')
      //     .then(response => {
      //       this.$scope.allOrder = response.data;
      //       console.log(this.$scope.allOrder);
      //     });
      //     console.log("out of get "+ this.$scope.allOrder);
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
    formSubmitted(form){
      this.$scope.submitted =true;
      if (form.$valid) {
        this.addNewOrder();
      }

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
  alOrders(){
    console.log("in alOrdfers");
    this.$scope.data = this.$http.get('/api/orders/')
           .then(response => {
            this.$scope.allOrder = response.data;
            console.log(response.data);
            return this.$scope.allOrder;
           });
           console.log("after http");
           return this.$scope.data;

  }
  userName(customer_id){
    this.$http.get('/api/users/'+ customer_id)
          .then(response => {
            var name = response.data.name;
            return name;
          });

  }
  convertFormat(date_time){
    return this.moment(date_time).format('LLL');
  }

}

  angular.module('foodmingleApp')
  .controller('OrdersCtrl', OrdersCtrl);

