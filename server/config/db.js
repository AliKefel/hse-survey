import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv


dotenv.config(); // Load environment variables from a .env file

const uri = process.env.MONGODB_URI; // Get the URI from the environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log('MongoDB connected!');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
