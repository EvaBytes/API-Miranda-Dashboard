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
        console.log('Conexión exitosa a la base de datos.');
    })
    .catch(err => { 
        console.error('Error al conectar a la base de datos:', err); 
});