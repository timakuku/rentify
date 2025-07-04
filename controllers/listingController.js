const Listing = require('../models/Listing');
const imagekit = require("../config/imagekit");




exports.createListing = async (req, res) => {
  try {
    console.log('req.files:', req.files);
    console.log('req.body:', req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Нет загруженных файлов" });
    }

    const { title, description, price, city, address, type } = req.body;

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
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
      type,
      images: imageUrls,
      user: req.user.id
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании объявления", error: err.message });
  }

  exports.getAllListings = async (req, res, next) => {
try {
const { city, minPrice, maxPrice, types, title } = req.query;
const query = {};

if (city) query.city = city;
if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
if (types) {
  const typesArray = types.split(',');
  query.type = { $in: typesArray };
}
if (title) {
  query.title = { $regex: title, $options: 'i' }; // нечувствительный поиск
}

const listings = await Listing.find(query);
res.json(listings);
} catch (err) {
next(err);
}
};
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
