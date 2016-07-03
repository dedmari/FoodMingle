'use strict';

describe('Controller: ContactusCtrl', function () {

  // load the controller's module
  beforeEach(module('foodmingleApp'));

  var ContactusCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    ContactusCtrl = $controller('ContactusCtrl', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
