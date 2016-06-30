'use strict';

var app = require('../..');
import request from 'supertest';

var newCookoffer;

describe('Cookoffer API:', function() {

  describe('GET /api/cookoffers', function() {
    var cookoffers;

    beforeEach(function(done) {
      request(app)
        .get('/api/cookoffers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cookoffers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cookoffers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cookoffers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cookoffers')
        .send({
          name: 'New Cookoffer',
          info: 'This is the brand new cookoffer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCookoffer = res.body;
          done();
        });
    });

    it('should respond with the newly created cookoffer', function() {
      expect(newCookoffer.name).to.equal('New Cookoffer');
      expect(newCookoffer.info).to.equal('This is the brand new cookoffer!!!');
    });

  });

  describe('GET /api/cookoffers/:id', function() {
    var cookoffer;

    beforeEach(function(done) {
      request(app)
        .get('/api/cookoffers/' + newCookoffer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cookoffer = res.body;
          done();
        });
    });

    afterEach(function() {
      cookoffer = {};
    });

    it('should respond with the requested cookoffer', function() {
      expect(cookoffer.name).to.equal('New Cookoffer');
      expect(cookoffer.info).to.equal('This is the brand new cookoffer!!!');
    });

  });

  describe('PUT /api/cookoffers/:id', function() {
    var updatedCookoffer;

    beforeEach(function(done) {
      request(app)
        .put('/api/cookoffers/' + newCookoffer._id)
        .send({
          name: 'Updated Cookoffer',
          info: 'This is the updated cookoffer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCookoffer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCookoffer = {};
    });

    it('should respond with the updated cookoffer', function() {
      expect(updatedCookoffer.name).to.equal('Updated Cookoffer');
      expect(updatedCookoffer.info).to.equal('This is the updated cookoffer!!!');
    });

  });

  describe('DELETE /api/cookoffers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cookoffers/' + newCookoffer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cookoffer does not exist', function(done) {
      request(app)
        .delete('/api/cookoffers/' + newCookoffer._id)
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
