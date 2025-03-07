import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log("MySQL Database connected successfully!");
        return connection;
    } catch (error) {
        console.error(" MySQL connection error:", error);
        process.exit(1);
    }
};

export { connectDB };
