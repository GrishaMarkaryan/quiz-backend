require('dotenv').config();
const express = require('express');
const cors = require('cors');
const quizRoutes = require('./api/routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Для кросс-доменных запросов
app.use(express.json());  // Для парсинга JSON в теле запросов

// Простой маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Hello, this is your quiz backend!');
  });


// Routes
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});