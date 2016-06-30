'use strict';

import mongoose from 'mongoose';

var CookofferSchema = new mongoose.Schema({
  cookId: String,
  dishname: String,
  pricedish: String,
  email: String,
  date_time: {
        type: Date, 
        default: Date.now
    },
  quantity: String,
  address: String,
  dishimage: String,
  active: Boolean
});

export default mongoose.model('Cookoffer', CookofferSchema);
