import mongoose from 'mongoose';

const uri = 'mongodb+srv://ali_kefel:3unice%40rtus@hse-survey.l3dg1.mongodb.net/SurveyResults?retryWrites=true&w=majority&appName=HSE-Survey';

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
