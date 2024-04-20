import express from 'express'
import indexRouter from './routes/indexRouter.js'
import usersRouter from './routes/userRouter.js'
import ErrorHandler from "./middlewares/errorMiddleware.js";
import morgan from "morgan";
const app = express()

// Middleware
app.use(express.json()); // permet de parser les requêtes POST avec un body de type application/json
app.use(express.urlencoded({ extended: true })); // permet de parser les requêtes POST avec un body de type application/x-www-form-urlencoded
app.use(morgan('dev')); // Logger Middleware

// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Error Handling Middleware
app.use(ErrorHandler);

export default app