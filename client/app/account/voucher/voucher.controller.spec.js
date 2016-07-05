'use strict';

describe('Component: VoucherComponent', function () {

  // load the controller's module
  beforeEach(module('foodmingleApp'));

  var VoucherComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    VoucherComponent = $componentController('VoucherComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
