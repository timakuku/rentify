const express = require('express');
const router = express.Router();
const {
createListing,
getAllListings,
getListingById
} = require('../controllers/listingController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authMiddleware');

router.get('/', getAllListings);
router.get('/:id', getListingById); // ← ДОБАВЬ ЭТУ СТРОКУ
router.post('/', auth, upload.array('images', 10), createListing);

module.exports = router;

router.get('/:id', async (req, res) => {
try {
const listing = await Listing.findById(req.params.id);
if (!listing) return res.status(404).json({ message: 'Объявление не найдено' });
res.json(listing);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
});
