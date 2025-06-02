const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
title: String,
description: String,
price: Number,
city: String,
address: String,
images: [String],
type: [String],
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User'
}
});

module.exports = mongoose.model('Listing', listingSchema);