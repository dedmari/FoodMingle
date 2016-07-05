'use strict';

var app = require('../..');
import request from 'supertest';

var newVoucher;

describe('Voucher API:', function() {

  describe('GET /api/vouchers', function() {
    var vouchers;

    beforeEach(function(done) {
      request(app)
        .get('/api/vouchers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vouchers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vouchers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/vouchers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vouchers')
        .send({
          name: 'New Voucher',
          info: 'This is the brand new voucher!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVoucher = res.body;
          done();
        });
    });

    it('should respond with the newly created voucher', function() {
      expect(newVoucher.name).to.equal('New Voucher');
      expect(newVoucher.info).to.equal('This is the brand new voucher!!!');
    });

  });

  describe('GET /api/vouchers/:id', function() {
    var voucher;

    beforeEach(function(done) {
      request(app)
        .get('/api/vouchers/' + newVoucher._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          voucher = res.body;
          done();
        });
    });

    afterEach(function() {
      voucher = {};
    });

    it('should respond with the requested voucher', function() {
      expect(voucher.name).to.equal('New Voucher');
      expect(voucher.info).to.equal('This is the brand new voucher!!!');
    });

  });

  describe('PUT /api/vouchers/:id', function() {
    var updatedVoucher;

    beforeEach(function(done) {
      request(app)
        .put('/api/vouchers/' + newVoucher._id)
        .send({
          name: 'Updated Voucher',
          info: 'This is the updated voucher!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVoucher = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVoucher = {};
    });

    it('should respond with the updated voucher', function() {
      expect(updatedVoucher.name).to.equal('Updated Voucher');
      expect(updatedVoucher.info).to.equal('This is the updated voucher!!!');
    });

  });

  describe('DELETE /api/vouchers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vouchers/' + newVoucher._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when voucher does not exist', function(done) {
      request(app)
        .delete('/api/vouchers/' + newVoucher._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
