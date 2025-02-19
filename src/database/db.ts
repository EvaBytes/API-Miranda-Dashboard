import mongoose from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Process env:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export {connectDB};
