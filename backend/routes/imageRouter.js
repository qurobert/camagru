import multer from "multer";
import express from "express";
import ImageController from "../controllers/imageController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const imageRouter = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 50 * 1024 * 1024 }});

imageRouter.get('/', verifyAuth, ImageController.getAllFromUser);
imageRouter.get('/:page', ImageController.getAll);
imageRouter.post('/publish', verifyAuth, ImageController.publish);
imageRouter.post('/preview', verifyAuth, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'filter', maxCount: 1 }
]), ImageController.create);
imageRouter.delete('/:id', verifyAuth, ImageController.delete);

export default imageRouter;