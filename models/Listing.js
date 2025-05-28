const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
title: String,
description: String,
price: Number,
city: String,
address: String,
images: [String]
});

module.exports = mongoose.model('Listing', listingSchema);