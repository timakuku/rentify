require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const listingRoutes = require('./routes/listingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Подключение к базе данных
connectDB();

// Статические файлы (загрузка изображений)
app.use('/uploads', express.static('uploads'));

// CORS для GitHub Pages
app.use(cors({
  origin: 'https://timakuku.github.io',
  credentials: true
}));

// Публичные файлы (если есть)
app.use(express.static('public'));

// Парсинг JSON
app.use(express.json());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
