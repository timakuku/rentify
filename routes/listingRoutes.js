const express = require('express');
const router = express.Router();
const { createListing, getAllListings } = require('../controllers/listingController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authMiddleware');

router.get('/', getAllListings);
router.post('/', auth, upload.array('images', 10), createListing);

module.exports = router;
