'use strict';

import mongoose from 'mongoose';

var VoucherSchema = new mongoose.Schema({
  name: String,
  info: String,
  validTill: Date,
  voucherImage: String,
  type: String
});

export default mongoose.model('Voucher', VoucherSchema);
