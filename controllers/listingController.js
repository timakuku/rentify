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
    const { title, description, price, city, address, type } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Файлы не загружены!" });
    }

    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "/rentify-images"
        });
        console.log("Загружен файл:", result.url);
        return result.url;
      })
    );

    const listing = new Listing({
      title,
      description,
      price,
      city,
      address,
      type,
      images: imageUrls,
      user: req.user.id
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error("Ошибка при создании объявления:", err);
    res.status(500).json({ message: "Ошибка при создании объявления" });
  }
};


// controllers/listingController.js

exports.getAllListings = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice, types } = req.query;
    const query = {};

    if (city) query.city = city;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    if (types) {
      const typesArray = types.split(','); // например: "apartment,house"
      query.type = { $in: typesArray };
    }

    console.log('query для фильтрации:', query); // ⚡️ ПРОВЕРКА В КОНСОЛИ!

    const listings = await Listing.find(query);
    res.json(listings);
  } catch (err) {
    next(err);
  }
};
