const axios = require('axios');


const generateQuiz = async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const prompt = `
        Create a multiple-choice quiz (5 questions) on the topic: "${topic}".
        Format as JSON with this structure:
        {
            "quiz": [
                {
                    "question": "Question text",
                    "options": ["Option1", "Option2", "Option3", "Option4"],
                    "correctAnswer": 0 (index of correct option)
                }
            ]
        }
        `;

        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 1000, 
                response_format: { type: "json_object" } 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
                }
            }
        );

        const quizData = JSON.parse(response.data.choices[0].message.content);
        res.json(quizData);

    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
};


/*
const generateQuiz = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
          return res.status(400).json({ error: "Topic is required" });
        }
        // Мок или запрос к DeepSeek API
        const mockQuiz = {
            quiz: [
                {
                    question: "Что такое JavaScript?",
                    options: ["Язык разметки", "Язык программирования", "База данных", "Графический редактор"],
                    correctAnswer: 1
                }
            ]
        };
        res.json(mockQuiz);

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to generate quiz" });
        }
};
*/
module.exports = { generateQuiz };