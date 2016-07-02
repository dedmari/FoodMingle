'use strict';

angular.module('foodmingleApp')
  .config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer || 'main';
          Auth.logout();
          $state.go(referrer,{'message':' You are Logged Out !!!','status':'logout'});
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('c-account', {
        url: '/c-account',
        templateUrl: 'app/account/cookaccount/cookaccount.html',
        controller: 'CookaccountController',
        controllerAs: 'vm',
        authenticate: "cook"
      })
      .state('postoffer', {
        url: '/postoffer',
        templateUrl: 'app/account/postoffer/postoffer.html',
        controller: 'GetoffersCtrl',
        controllerAs: 'vm',
        authenticate: "cook"
      })
      .state('getoffers', {
        url: '/getoffers',
        templateUrl: 'app/account/getoffer/getoffer.html',
        controller: 'GetoffersCtrl',
        controllerAs: 'vm',
        authenticate: "cook"
      })
      .state('offerinfo', {
        url: '/offerinfo?offer_id',
        templateUrl: 'app/orders/orders.html',
        params:      {'offer_id': null,
                      'dishname':null,
                      'pricedish':null,
                      'email':null,
                      'date_time':null,
                      'quantity':null,
                      'address':null,
                      'dishimage':null,
                      'active':null},
        controller: 'OrdersCtrl',
        controllerAs: 'vm',
        authenticate: "customer" 
      })
      .state('updateoffer', {
        url: '/update',
        templateUrl: 'app/account/postoffer/postoffer.html',
        params:      {'offer_id': null},
        controller: 'GetoffersCtrl',
        controllerAs: 'vm',
        authenticate: "cook" 
      })
      .state('cus-account', {
        url: '/cus-account',
        templateUrl: 'app/orders/customeraccount.html',
        controller: 'OrdersCtrl',
        controllerAs: 'vm',
        authenticate: "customer"
      })
      .state('getorders', {
        url: '/my-orders',
        templateUrl: 'app/orders/customerorders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'vm',
        authenticate: "customer"
      });
 
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
