const Listing = require('../models/Listing');

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    next(err);
  }
};



exports.createListing = async (req, res, next) => {
try {
const { title, description, price, city, address } = req.body;
const imagePaths = req.files.map(file => '/uploads/' + file.filename);

const listing = new Listing({
  title,
  description,
  price,
  city,
  address,
  images: imagePaths
});

await listing.save();
res.status(201).json(listing);
} catch (err) {
next(err);
}
};