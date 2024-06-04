// backend/routes/likeRouter.js
import express from "express";
import LikeController from "../controllers/likeController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const likeRouter = express.Router();

likeRouter.post('/', verifyAuth, LikeController.create);
likeRouter.get('/:imageId', verifyAuth, LikeController.getAll);
likeRouter.delete('/:id', verifyAuth, LikeController.delete);

export default likeRouter;