/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Order from './order.model';
import Offer from '../cookoffer/cookoffer.model';
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  console.log('in handleError');
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orders
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Offers of a Cook
export function showCustomerOrders(req, res) {
  return Order.find({customer_id:req.params.id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Order from the DB
export function show(req, res) {
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {

  var upres;
  console.log(req.body);
  //updating cookoffer status to ordered
  Offer.findById(req.body.offer_id).exec()
    .then(saveUpdates(req.body));

  // creating the order
  return Order.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  var offer_up = {status: 'completed'};
  Offer.findById(req.params.offer_id).exec()
    .then(saveUpdates(offer_up));

  var update = {status : 'completed'};
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(update))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  var offer_up = {status: 'active'};
  Offer.findById(req.params.offer_id).exec()
    .then(saveUpdates(offer_up));
    
  return Order.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
