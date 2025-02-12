import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { authRouter } from './controllers/authController';
import { bookingRouter } from './controllers/bookingsController';
import { roomRouter } from './controllers/roomsController';
import { contactRouter } from './controllers/contactController';
import { userRouter } from './controllers/usersController';

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();
const app = express();
const port = 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de mi API',
            version: '1.0.0',
            description: 'Descripción de mi API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};

app.use(express.json());
app.use("/login", authRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/live', (req: Request, res: Response) => {
    res.send(`${new Date().toISOString()}`);
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});