require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const listingRoutes = require('./routes/listingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Подключение к бд
connectDB();

// Раздача изображений с CORS-заголовками
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://timakuku.github.io'); // 👈 Разрешить доступ твоего фронта
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static('uploads'));

console.log("IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);

// Основной CORS для API
app.use(cors({
origin: process.env.CLIENT_ORIGIN || 'https://timakuku.github.io',
}));

// Парсинг JSON
app.use(express.json());

// Публичные файлы (если есть)
app.use(express.static('public'));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
