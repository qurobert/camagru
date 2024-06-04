// backend/routes/commentRouter.js
import express from "express";
import CommentController from "../controllers/commentController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post('/', verifyAuth, CommentController.create);
commentRouter.get('/:imageId', verifyAuth, CommentController.getAll);
commentRouter.delete('/:id', verifyAuth, CommentController.delete);

export default commentRouter;