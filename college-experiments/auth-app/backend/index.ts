import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "./models/db";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./routes/AuthRouter";
import ProductRouter from "./routes/ProductRouter";

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.get("/api", (req: Request, res: Response): void => {
  res.send("Welcome");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
