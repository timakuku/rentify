require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const listingRoutes = require('./routes/listingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


// ✅ Подключаем к MongoDB
connectDB();
app.use('/uploads', express.static('uploads'));

// ✅ Разрешаем CORS (лучше указать origin явно)
app.use(cors({
  origin: ['http://localhost:5500', 'http://localhost:3000/api'], // если ты открываешь index.html через Live Server
  credentials: true
}));

app.use(express.static('public'));


// ✅ Парсим JSON тело запросов
app.use(express.json());

// ✅ Роуты
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// ✅ Обработчик ошибок
app.use(errorHandler);

// ✅ Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
