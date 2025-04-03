const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sync database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});