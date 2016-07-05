'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var voucherCtrlStub = {
  index: 'voucherCtrl.index',
  show: 'voucherCtrl.show',
  create: 'voucherCtrl.create',
  update: 'voucherCtrl.update',
  destroy: 'voucherCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var voucherIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './voucher.controller': voucherCtrlStub
});

describe('Voucher API Router:', function() {

  it('should return an express router instance', function() {
    expect(voucherIndex).to.equal(routerStub);
  });

  describe('GET /api/vouchers', function() {

    it('should route to voucher.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'voucherCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/vouchers/:id', function() {

    it('should route to voucher.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'voucherCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/vouchers', function() {

    it('should route to voucher.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'voucherCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/vouchers/:id', function() {

    it('should route to voucher.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'voucherCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vouchers/:id', function() {

    it('should route to voucher.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'voucherCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vouchers/:id', function() {

    it('should route to voucher.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'voucherCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
