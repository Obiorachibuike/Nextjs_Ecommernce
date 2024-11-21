import mongoose from 'mongoose';
import BlogPost from "../models/BlogPost.js"; // Assuming the model is in BlogPost.js


const dbConnect = async () => {
  const MONGO_URI = process.env.MONGODB_URI;
  console.log(MONGO_URI )
  if (!MONGO_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }


  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
 

    
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    throw error;
  }
};

export default dbConnect;
