import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize ({

            dialect: "mysql",
            host: process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: false,
        });

        sequelize.authenticate()
        .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => { 
        console.error('Error connecting to the database', err); 
});