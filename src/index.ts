import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { bookingRouter } from "./controllers/bookingsController";
import { contactRouter } from "./controllers/contactController";
import { roomRouter } from "./controllers/roomsController";
import { userRouter } from "./controllers/usersController";
import { authRouter } from "./controllers/authController";
import { errorHandler } from './utils/errorHandler';


dotenv.config();

const app = express();
const port = 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Description',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());

app.use('/api-dashboard', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api-dashboard/auth', authRouter);
app.use('/api-dashboard/bookings', bookingRouter);
app.use('/api-dashboard/contacts', contactRouter);
app.use('/api-dashboard/rooms', roomRouter);
app.use('/api-dashboard/users', userRouter);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});