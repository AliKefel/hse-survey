import mongoose from 'mongoose';


const SurveyResultSchema = new mongoose.Schema({
  participantId: {
    type: String,
    required: true,
  },
  surveyId: {
    type: String,
    required: true,
  },
  buttonClicks: {
    type: Number,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
}, { collection: 'SurveyResults' });





const SurveyResult = mongoose.model('SurveyResults', SurveyResultSchema);

export default SurveyResult; // Use ES6 export syntax
