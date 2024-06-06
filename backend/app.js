import express from 'express'
import 'express-async-errors';
import indexRouter from './routes/indexRouter.js'
import usersRouter from './routes/userRouter.js'
import imageRouter from './routes/imageRouter.js'
import authRouter from './routes/authRouter.js'
import commentRouter from "./routes/commentRouter.js";
import likeRouter from "./routes/likeRouter.js";
import morgan from "morgan";
import {globalErrorLogger, globalErrorMiddleware} from "./middlewares/globalErrorMiddleware.js";
import {error404} from "./errors/error404.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
const app = express()

// Middleware
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cors({
	origin: 'http://localhost',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true,
	preflightContinue: false,
	// optionsSuccessStatus: 204
}));

// Configurer les routes pour répondre aux requêtes préliminaires OPTIONS
app.options('*', cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

app.use(
	error404,
	globalErrorLogger,
	globalErrorMiddleware
);

export default app