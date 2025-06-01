const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const auth = require('../middlewares/authMiddleware'); 
const upload = require('../middlewares/upload'); 
module.exports = router;

const { createListing } = require('../controllers/listingController');

router.post('/', auth, upload.array('images', 10), createListing);

module.exports = router;
// GET /api/listings — все объявления



// POST /api/listings 
router.post('/', auth, upload.array('images', 10), async (req, res) => { try { const { title, description, price, city, address } = req.body;

  
const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

const listing = new Listing({
  title,
  description,
  price,
  city,
  address,
  images: imagePaths,
  user: req.user.id,
});

await listing.save();
res.status(201).json(listing);
} catch (err) { console.error(err); res.status(500).json({ message: 'Ошибка при создании объявления' }); } });


  

router.get('/', async (req, res) => {
try {
const listings = await Listing.find();
res.json(listings); // всегда JSON
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Ошибка сервера' });
}
});
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Объявление не найдено' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


router.get('/', async (req, res) => {
  const { city, minPrice, maxPrice, types } = req.query;
  const query = {};

  if (city) query.city = city;
  if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

  if (types) {
    const typesArray = types.split(','); // ["apartment", "house"]
    query.type = { $in: typesArray };
  }

  const listings = await Listing.find(query);
  res.json(listings);
});


module.exports = router;
