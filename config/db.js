const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB подключен!');
  } catch (err) {
    console.error('❌ Ошибка подключения:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
