'use strict';

import mongoose from 'mongoose';


var OrderSchema = new mongoose.Schema({
  customer_id: String,
  offer_id: String,
  dishname: String,
  pricedish: String,
  email: String,
  address:String,
  quantity:String,
  date_time: {
        type: Date, 
        default: Date.now
    },
  date_offer: Date,
  payment_status: {
        type: String, 
        default: 'complete'
    }
});


export default mongoose.model('Order', OrderSchema);
