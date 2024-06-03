import express from 'express'
import 'express-async-errors';
import indexRouter from './routes/indexRouter.js'
import usersRouter from './routes/userRouter.js'
import imageRouter from './routes/imageRouter.js'
import authRouter from './routes/authRouter.js'
import morgan from "morgan";
import {globalErrorLogger, globalErrorMiddleware} from "./middlewares/globalErrorMiddleware.js";
import {error404} from "./errors/error404.js";
import cors from 'cors';

const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
	origin: 'http://localhost' // Adjust the port if your frontend is on a different one
}));

// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);

app.use(
	error404,
	globalErrorLogger,
	globalErrorMiddleware
);

export default app