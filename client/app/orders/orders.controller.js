class OrdersCtrl {
  constructor($http, $scope,  $state, $stateParams) {
      this.$http        = $http;
      this.$state       = $state;
      this.$stateParams = $stateParams;
      this.$scope       = $scope;
      var offer_id     = this.$stateParams.offer_id;
     
      this.$http.get('/api/cookoffers/'+ offer_id)
        .then(response => {
          this.$scope.offer_id = response.data;
        });
  }


    addNewOrder(){
        var orderUrl = '/api/orders';
        this.$http.post(orderUrl, this.$scope.offer_id);
        this.$state.go('main');
    }

}


  angular.module('foodmingleApp')
  .controller('OrdersCtrl', OrdersCtrl);

