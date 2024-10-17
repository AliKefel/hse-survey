import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import surveyRoutes from './routes/SurveyRoutes.js'; // Adjusted import for your routes
import connectDB from './config/db.js'; // Import the connection function

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
const allowedOrigins = ['https://hse-survey.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(helmet()); // Add security headers
app.use(express.json()); // To parse JSON body

// Connect to MongoDB
connectDB(); // Call the connection function to connect to the database

app.get('/', (req, res) => {
  res.send('Server is running!'); // Responds with a simple message
});

// Use survey routes
app.use('/api', surveyRoutes); // Add survey routes under the /api prefix

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});