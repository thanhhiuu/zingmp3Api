const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Cấu hình các nguồn được phép
const allowedOrigins = [
  process.env.VITE_NODE_ENV,
  'https://zingmp3api-qwgj.onrender.com',
  'https://project-song.vercel.app',
];

// Middleware CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Page Home
app.get('/', (req, res) => {
  res.send('SERVER ON');
});

// ZingMp3Router
const ZingMp3Router = require('./src/routes/ZingRouter');
app.use('/api', cors(corsOptions), ZingMp3Router);

// Page Error
app.get('*', (req, res) => {
  res.send('Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<');
});

app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
