import express from 'express'
import 'express-async-errors';
import indexRouter from './routes/indexRouter.js'
import usersRouter from './routes/userRouter.js'
import morgan from "morgan";
import {errorLogger, errorMiddleware} from "./middlewares/errorMiddleware.js";
// import {globalErrorMiddleware} from "./middlewares/errorMiddleware.js";

const app = express()

// Middleware
app.use(express.json()); // permet de parser les requêtes POST avec un body de type application/json
app.use(express.urlencoded({ extended: true })); // permet de parser les requêtes POST avec un body de type application/x-www-form-urlencoded
app.use(morgan('dev')); // Logger Middleware

// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Custom error handling middleware
app.use(
	errorLogger,
	errorMiddleware
);

export default app