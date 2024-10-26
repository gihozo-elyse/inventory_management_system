import dotenv from "dotenv"
import express, { Express, Request, Response, NextFunction } from "express"
import cors from "cors";
import morgan from "morgan"
import httpStatus from "http-status"
import { connectDB } from "./Databases/config/config";
import router from "./router";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config()

const app:Express = express()
const Port = process.env.PORT
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

app.use('/api',router);
app.get("**", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "Welcome to a simple RESTful API for an inventory management system."
  });
});

app.use(errorHandler);
app.listen(Port, async() => {
    await connectDB();
  console.log(`Server is running on port ${Port}`);
});