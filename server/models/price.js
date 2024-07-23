const mongoose = require('mongoose')

const Schema = mongoose.Schema
const priceSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
  });
  
  const Price = mongoose.model('Price', priceSchema);

  module.exports = Price