import multer from "multer";
import express from "express";
import ImageController from "../controllers/imageController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const imageRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

imageRouter.post('/', verifyAuth, upload.fields([
    { name: 'background', maxCount: 1 },
    { name: 'overlay', maxCount: 1 }
]), ImageController.create);
imageRouter.get('/', verifyAuth, ImageController.getAll);
imageRouter.delete('/delete/:id', verifyAuth, ImageController.delete);

export default imageRouter;