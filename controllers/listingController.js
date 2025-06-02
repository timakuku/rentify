const Listing = require('../models/Listing');
const imagekit = require("../config/imagekit");

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, city, address } = req.body;
    const file = req.files[0]; // предположим, первый файл

    // Загружаем в ImageKit
    const uploadResponse = await imagekit.upload({
      file: file.buffer, // сам файл
      fileName: file.originalname,
      folder: "/rentify-images"
    });

    const listing = new Listing({
      title,
      description,
      price,
      city,
      address,
      images: [uploadResponse.url],
      user: req.user.id
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании объявления" });
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