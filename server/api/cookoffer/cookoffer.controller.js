/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cookoffers              ->  index
 * POST    /api/cookoffers              ->  create
 * GET     /api/cookoffers/:id          ->  show
 * PUT     /api/cookoffers/:id          ->  update
 * DELETE  /api/cookoffers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Cookoffer from './cookoffer.model';
import multer from 'multer';

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);           

        }
    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

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
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Cookoffers
export function index(req, res) {
  return Cookoffer.find({status:'active'}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Offers of a Cook
export function showCookOffers(req, res) {
  return Cookoffer.find({cookId:req.params.id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a single Cookoffer from the DB
export function show(req, res) {
  return Cookoffer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cookoffer in the DB
export function create(req, res) {
  upload(req,res,function(err){
          var offerAttr = req.body;
          offerAttr.dishimage = req.file.filename;
          return Cookoffer.create(offerAttr)
            .then(respondWithResult(res, 201))
            .catch(handleError(res));
        });
}

// Updates an existing Cookoffer in the DB
export function update(req, res) {

  upload(req,res,function(err){
          var offerAttr = req.body;
          offerAttr.dishimage = req.file.filename;
           if (offerAttr._id) {
            delete offerAttr._id;
          }
          return Cookoffer.findById(req.params.id).exec()
            .then(handleEntityNotFound(res))
            .then(saveUpdates(offerAttr))
            .then(respondWithResult(res))
            .catch(handleError(res));
  });
}

// Deletes a Cookoffer from the DB
export function destroy(req, res) {
  return Cookoffer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
