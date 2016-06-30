'use strict';
(function(){

class GetofferComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('foodmingleApp')
  .component('getoffer', {
    templateUrl: 'app/account/getoffer/getoffer.html',
    controller: GetofferComponent
  });

})();

angular.module('foodmingleApp')
  .controller('GetoffersCtrl', function ($scope, $http, multipartForm,Auth) {
    $scope.cookId = Auth.getCurrentUser()._id;
    console.log($scope.cookId);
    $http.get('/api/cookoffers')
    .success(function(data) {
      $scope.cookoffers = data;
    })
    .error(function(err) {
      alert('Error! Something went wrong');
    });

    $scope.deleteOffer = function(index){
      $http.delete('/api/cookoffers/' + $scope.cookoffers[index]._id)
      .success(function(){
        $scope.cookoffers.splice(index, 1);
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };
    $scope.addNewOffer = function(){
    	//console.log($scope.Offer);
      var uploadUrl = '/api/cookoffers';
      multipartForm.post(uploadUrl, $scope.Offer);
    };

    $scope.viewOfferImage = function(){
    $http.get('/files')
    .success(function(data) {
      $scope.offerimage = data;
      
    })
    .error(function(err) {
      alert('Error! Something went wrong');
      });
    };

  });
