'use strict';

(function() {

  class MainController {

    constructor($http, $scope,  $state, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.$state = $state;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
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

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('foodmingleApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
