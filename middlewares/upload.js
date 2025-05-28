const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, 'uploads/'); // папка uploads должна существовать
},
filename: function (req, file, cb) {
const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
cb(null, unique + path.extname(file.originalname));
}
});

const upload = multer({ storage });

module.exports = upload;