import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import surveyRoutes from './routes/SurveyRoutes.js'; // Adjusted import for your routes
import connectDB from './config/db.js'; // Import the connection function

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware

const allowedOrigins = ['https://hse-survey.vercel.app'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

app.use(cors());

app.use(express.json()); // To parse JSON body

// Connect to MongoDB
connectDB(); // Call the connection function to connect to the database

app.get('/', (req, res) => {
    res.send('Server is running!'); // Responds with a simple message
});

// Use survey routes
app.use('/api', surveyRoutes); // Add survey routes under the /api prefix

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
