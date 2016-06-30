'use strict';

import mongoose from 'mongoose';


var OrderSchema = new mongoose.Schema({
  offer_id: String,
  dishname: String,
  pricedish: String,
  email: String,
  date_time: {
        type: Date, 
        default: Date.now
    },
  date_offer: Date,
  payment_status: String,
  order_status: Boolean
});


export default mongoose.model('Order', OrderSchema);
