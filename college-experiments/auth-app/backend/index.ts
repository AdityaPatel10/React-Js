import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "./models/db"; // Ensure this works if you're using TypeScript with appropriate configurations
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./routes/AuthRouter";
import ProductRouter from "./routes/ProductRouter";

// Initialize dotenv to read from .env
dotenv.config();

// Create Express application
const app = express();

// Set the port from the environment variables or use a default
const PORT: number = Number(process.env.PORT) || 3000;

// Define a basic route
app.get("/api", (req: Request, res: Response): void => {
  res.send("Welcome");
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Mount the AuthRouter for authentication-related routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
