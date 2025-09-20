const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 20,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

async function connectWithRetry(retries = 0) {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    if (retries < MAX_RETRIES) {
      console.log(`🔄 Retrying MongoDB connection (${retries + 1}/${MAX_RETRIES}) in ${RETRY_DELAY_MS / 1000}s...`);
      setTimeout(() => connectWithRetry(retries + 1), RETRY_DELAY_MS);
    } else {
      console.error('❌ Failed to connect to MongoDB after maximum retries. Exiting.');
      process.exit(1);
    }
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
  connectWithRetry();
});

module.exports = connectWithRetry;
