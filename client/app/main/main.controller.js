'use strict';

(function() {

  class MainController {

    constructor($http, $scope,  $state, socket,Auth) {
      this.$http    = $http;
      this.socket   = socket;
      this.$state   = $state;
      this.isCook   = Auth.isCook;
    }

    $onInit() {
      this.$http.get('/api/cookoffers')
        .then(response => {
          this.cookoffers  = response.data;
          this.socket.syncUpdates('cookoffers', this.cookoffers);
        });
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

  }

  angular.module('foodmingleApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
