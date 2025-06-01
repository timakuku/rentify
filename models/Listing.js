const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  city: String,
  address: String,
  type: String, // ✅ Добавляем тип жилья
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
