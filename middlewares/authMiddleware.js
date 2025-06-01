const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader?.startsWith('Bearer ')) {
return res.status(401).json({ message: 'Нет токена' });
}

const token = authHeader.split(' ')[1];

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (err) {
res.status(401).json({ message: 'Неверный токен' });
}
};

