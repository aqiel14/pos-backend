const mongoose = require('mongoose');
const schema = mongoose.Schema({
  machinename: String,
  operator: String,
  capacity: Number,
  unit: String,
  description: String,
  status: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('machine', schema);