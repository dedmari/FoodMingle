/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vouchers              ->  index
 * POST    /api/vouchers              ->  create
 * GET     /api/vouchers/:id          ->  show
 * PUT     /api/vouchers/:id          ->  update
 * DELETE  /api/vouchers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Voucher from './voucher.model';
import multer from 'multer';

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './Vouchers/');
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

// Gets a list of Vouchers
export function index(req, res) {
  return Voucher.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Voucher from the DB
export function show(req, res) {
  return Voucher.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Voucher in the DB
export function create(req, res) {
    upload(req,res,function(err){
          console.log(req.file);
          var voucherAttr = req.body;
          voucherAttr.voucherImage = req.file.filename;
          return Voucher.create(voucherAttr)
            .then(respondWithResult(res, 201))
            .catch(handleError(res));
        });
}

// Updates an existing Voucher in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Voucher.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Voucher from the DB
export function destroy(req, res) {
  return Voucher.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
