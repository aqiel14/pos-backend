const mongoose = require('mongoose');
const schema = mongoose.Schema({
  materialname: String,
  price: Number,
  qty: Number,
  unit: String,
  total: Number,
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('material', schema);
