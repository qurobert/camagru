// backend/routes/commentRouter.js
import express from "express";
import CommentController from "../controllers/commentController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post('/', verifyAuth, CommentController.create);
commentRouter.get('/:imageId', CommentController.getAllForImage);

export default commentRouter;