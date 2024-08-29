const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const axios = require('axios');
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

// Middleware để xử lý yêu cầu đến Zing MP3 API
const zingMp3Proxy = async (req, res, next) => {
  if (req.path.startsWith('/song')) {
    try {
      const zingApiUrl =
        'https://zingmp3.vn/api/v2/song/get/streaming' +
        req.url.slice('/api/song'.length);
      const response = await axios.get(zingApiUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Origin: 'https://zingmp3.vn',
          Referer: 'https://zingmp3.vn/',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error accessing Zing MP3 API:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from Zing MP3 API' });
    }
  } else {
    next();
  }
};

// Page Home
app.get('/', (req, res) => {
  res.send('SERVER ON');
});

// Áp dụng middleware CORS và Zing MP3 Proxy
app.use(cors(corsOptions));
app.use(zingMp3Proxy);

// ZingMp3Router (nếu bạn vẫn muốn giữ lại)
const ZingMp3Router = require('./src/routes/ZingRouter');
app.use('/api', ZingMp3Router);

// Page Error
app.get('*', (req, res) => {
  res.send('Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<');
});

app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
