const mongoose = require('mongoose');
const schema = mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
  image: String,
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  bahan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bahan' }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('product', schema);
