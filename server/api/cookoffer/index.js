'use strict';

var express = require('express');
var controller = require('./cookoffer.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/offers', auth.isAuthenticated(), controller.showCookOffers);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

 
module.exports = router;
