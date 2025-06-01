require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const listingRoutes = require('./routes/listingRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


connectDB();
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB подключен!'))
  .catch(err => console.error('❌ Ошибка подключения:', err));

app.use('/uploads', express.static('uploads'));


app.use(cors({
  origin: 'https://timakuku.github.io',
  credentials: true
}));


app.use(express.static('public'));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
