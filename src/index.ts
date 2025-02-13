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

app.get('/info', (req: Request, res: Response) => {
    const hotelInfo = {
        hotelName: "Miranda Hotel",
        description: "Welcome to Miranda Hotel, the best place to lose your mind.",
        availableEndpoints: [
            { endpoint: '/api/v1/bookings', method: 'GET', description: 'Get all bookings' },
            { endpoint: '/api/v1/bookings/{reservationNumber}', method: 'GET', description: 'Get a booking by Reservation Number' },
            { endpoint: '/api/v1/rooms', method: 'GET', description: 'Get information about rooms' },
            { endpoint: '/api/v1/contact', method: 'POST', description: 'Create a new contact message' },
            { endpoint: '/api/v1/contact/{roomNumber}', method: 'DELETE', description: 'Delete a contact message' },
            { endpoint: '/api/v1/user', method: 'POST', description: 'Register a new user' }
        ]
    };
    
    res.json(hotelInfo);
});

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
app.use("/api/v1/login", authRouter);
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