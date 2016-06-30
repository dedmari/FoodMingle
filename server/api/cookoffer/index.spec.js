'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cookofferCtrlStub = {
  index: 'cookofferCtrl.index',
  show: 'cookofferCtrl.show',
  create: 'cookofferCtrl.create',
  update: 'cookofferCtrl.update',
  destroy: 'cookofferCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cookofferIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cookoffer.controller': cookofferCtrlStub
});

describe('Cookoffer API Router:', function() {

  it('should return an express router instance', function() {
    expect(cookofferIndex).to.equal(routerStub);
  });

  describe('GET /api/cookoffers', function() {

    it('should route to cookoffer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cookofferCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cookoffers/:id', function() {

    it('should route to cookoffer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cookofferCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cookoffers', function() {

    it('should route to cookoffer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cookofferCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cookoffers/:id', function() {

    it('should route to cookoffer.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cookofferCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cookoffers/:id', function() {

    it('should route to cookoffer.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cookofferCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cookoffers/:id', function() {

    it('should route to cookoffer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cookofferCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
