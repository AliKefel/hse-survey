import express from 'express';
import SurveyResult from '../models/SurveyResult.js'; // Use correct import

// Create a new router
const router = express.Router();

// API endpoint to save survey results
router.post('/survey-results', async (req, res) => {
  const { participantId, surveyId, buttonClicks, money, submittedAt } = req.body;
  try {
    const surveyResult = new SurveyResult({
      participantId,
      surveyId,
      buttonClicks,
      money,
    });
    await surveyResult.save();
    res.status(201).json({ message: 'Survey result saved successfully!' });
  }
  catch (error) {
    console.error('Error saving survey result:', error); // Added logging for debugging
    res.status(500).json({ message: 'Error saving survey result.', error: error.message });
  }
});

export default router; // Use ES6 export syntax
