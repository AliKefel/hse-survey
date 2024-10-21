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

// Pre-save middleware to adjust time to Arizona timezone
SurveyResultSchema.pre('save', function (next) {
  // Convert `submittedAt` to Arizona timezone
  this.submittedAt = moment().tz('America/Phoenix').toDate();
  next();
});



const SurveyResult = mongoose.model('SurveyResults', SurveyResultSchema);

export default SurveyResult; // Use ES6 export syntax
