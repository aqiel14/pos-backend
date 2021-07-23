const mongoose = require('mongoose');
const schema = mongoose.Schema({
  name: String,
  stock: Number,
  hpp: Number,
  price: Number,
  profit: { type: Number, default: 0 },
  image: String,
<<<<<<< HEAD
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  bahan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bahan' }],
=======
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
>>>>>>> 9d8c3ca (update kasir)
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('product', schema);
