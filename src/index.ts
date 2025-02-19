import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { authRouter } from "./controllers/authController";
import { bookingRouter } from "./controllers/bookingsController";
import { roomRouter } from "./controllers/roomsController";
import { contactRouter } from "./controllers/contactController";
import { userRouter } from "./controllers/usersController";
import { verifyJWT } from "./middleware/authMiddleware";
import { connectDB } from "./database/db";


dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

connectDB().then(() => {
    console.log("Database connected, starting server...");

    app.use("/api/v1/login", authRouter);
    app.use("/api/v1/bookings", verifyJWT, bookingRouter);
    app.use("/api/v1/rooms", verifyJWT, roomRouter);
    app.use("/api/v1/contact", verifyJWT, contactRouter);
    app.use("/api/v1/user", verifyJWT, userRouter);
  
    app.get("/info", (req: Request, res: Response) => {
      res.json({
        hotelName: "Miranda Hotel",
        description: "Welcome to Miranda Hotel, the best place to lose your mind.",
        availableEndpoints: [
          { endpoint: "/api/v1/bookings", method: "GET", description: "Get all bookings" },
          { endpoint: "/api/v1/bookings/{reservationNumber}", method: "GET", description: "Get a booking by Reservation Number" },
          { endpoint: "/api/v1/rooms", method: "GET", description: "Get information about rooms" },
          { endpoint: "/api/v1/contact", method: "POST", description: "Create a new contact message" },
          { endpoint: "/api/v1/user", method: "POST", description: "Register a new user" }
        ]
      });
    });
  
    app.get("/live", (req: Request, res: Response) => {
      res.send(`${new Date().toISOString()}`);
    });
  
    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Miranda Hotel API Documentation",
          version: "1.0.0",
          description: "API documentation for Miranda Hotel",
        },
        servers: [{ url: "http://localhost:3000" }],
      },
      apis: ["./src/controllers/*.ts"],
    };
  
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
  