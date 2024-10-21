import mongoose from 'mongoose';
import moment from 'moment-timezone';

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
    default: () => moment().tz('America/Phoenix').toDate(), // Set default to Arizona time
  }
}, { collection: 'SurveyResults' });

// Pre-save middleware to adjust time to Arizona timezone
SurveyResultSchema.pre('save', function (next) {
  // Convert `submittedAt` to Arizona timezone
  this.submittedAt = moment().tz('America/Phoenix').toDate();
  next();
});



const SurveyResult = mongoose.model('SurveyResults', SurveyResultSchema);

export default SurveyResult; // Use ES6 export syntax
