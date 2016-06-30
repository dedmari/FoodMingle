'use strict';

describe('Component: GetofferComponent', function () {

  // load the controller's module
  beforeEach(module('foodmingleApp'));

  var GetofferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    GetofferComponent = $componentController('GetofferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
