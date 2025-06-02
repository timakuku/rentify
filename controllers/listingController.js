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
    const files = req.files;

    // Загружаем каждую картинку в ImageKit и собираем URL
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "/rentify-images"
        });
        return result.url;
      })
    );

    const listing = new Listing({
      title,
      description,
      price,
      city,
      address,
      images: imageUrls,
      user: req.user.id // если у тебя в req.user хранится id
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании объявления" });
  }
};
