const mongoose = require('mongoose');
const schema = mongoose.Schema({ 
  materialname: String,
  amount: Number,
  materialneeded: Number,
  materialunit: String,
  stock: Number,
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product',required: true }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('bahan', schema);
