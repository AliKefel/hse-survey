import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import surveyRoutes from './routes/SurveyRoutes.js'; // Adjusted import for your routes
import connectDB from './config/db.js'; // Import the connection function

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON body

// Connect to MongoDB
connectDB(); // Call the connection function to connect to the database

// Use survey routes
app.use('/api', surveyRoutes); // Add survey routes under the /api prefix

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
