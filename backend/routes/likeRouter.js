// backend/routes/likeRouter.js
import express from "express";
import LikeController from "../controllers/likeController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const likeRouter = express.Router();

likeRouter.post('/', verifyAuth, LikeController.create);
likeRouter.get('/:imageId', LikeController.getAll);
//id of the image and not the like seems more simple for the front
likeRouter.delete('/:id', verifyAuth, LikeController.deleteByImageId);

export default likeRouter;