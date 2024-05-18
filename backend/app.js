import express from 'express'
import 'express-async-errors';
import indexRouter from './routes/indexRouter.js'
import usersRouter from './routes/userRouter.js'
import morgan from "morgan";
import {globalErrorLogger, globalErrorMiddleware} from "./middlewares/globalErrorMiddleware.js";
import {error404} from "./errors/error404.js";
import cors from 'cors';
const app = express()

// Middleware
app.use(express.json()); // permet de parser les requêtes POST avec un body de type application/json
app.use(express.urlencoded({ extended: true })); // permet de parser les requêtes POST avec un body de type application/x-www-form-urlencoded
app.use(morgan('dev')); // Logger Middleware
app.use(cors()); // Cors Middleware
// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Custom error handling middleware
app.use(
	error404,
	globalErrorLogger,
	globalErrorMiddleware
);

export default app