import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { authRouter } from "./controllers/authController";
import { bookingRouter } from "./controllers/bookingsController";
import { roomRouter } from "./controllers/roomsController";
import { contactRouter } from "./controllers/contactController";
import { userRouter } from "./controllers/usersController";
import { verifyJWTMiddleware } from "./middleware/authMiddleware";
import { connectDB } from "./database/db";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/api/v1/login", authRouter);
app.use("/api/v1/bookings",verifyJWTMiddleware, bookingRouter);
app.use("/api/v1/rooms",verifyJWTMiddleware, roomRouter);
app.use("/api/v1/contacts",verifyJWTMiddleware, contactRouter);
app.use("/api/v1/users",verifyJWTMiddleware, userRouter);

app.get("/info", (req: Request, res: Response) => {
  res.json({
    hotelName: "Miranda Hotel",
    description: "Welcome to Miranda Hotel, the best place to lose your mind.",
    availableEndpoints: [
      { endpoint: "/api/v1/bookings", method: "GET", description: "Get all bookings" },
      { endpoint: "/api/v1/bookings/{reservationNumber}", method: "GET", description: "Get a booking by Reservation Number" },
      { endpoint: "/api/v1/rooms", method: "GET", description: "Get information about rooms" },
      { endpoint: "/api/v1/contact", method: "POST", description: "Create a new contact message" },
      { endpoint: "/api/v1/users", method: "POST", description: "Register a new user" }
    ]
  });
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Miranda Hotel API Documentation",
      version: "1.0.0",
      description: "API documentation for Miranda Hotel",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error("Error:", err.message);
  console.error("Stack Trace:", err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.get("/live", (req: Request, res: Response) => {
  res.send(`${new Date().toISOString()}`);
});

connectDB().then(() => {
    console.log("Database connected, starting server...");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});
