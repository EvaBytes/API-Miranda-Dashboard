import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;

const testDB = async () => {
    try {
        console.log('Intentando conectar a MongoDB...');
        await mongoose.connect(uri);
        console.log('Conectado correctamente a MongoDB.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
};

testDB();
