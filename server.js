require('dotenv').config();
const express = require('express');
const cors = require('cors');
const quizRoutes = require('./api/routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});