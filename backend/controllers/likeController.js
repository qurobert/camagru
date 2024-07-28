// backend/controllers/likeController.js
import LikeModel from "../models/likeModel.js";

export default class LikeController {
    static async create(req, res) {
        try {
            const { imageId } = req.body;
            const userId = req.user.id;
            await LikeModel.create(imageId, userId);
            res.status(201).send("Like added successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAll(req, res) {
        try {
            const { imageId } = req.params;
            const likes = await LikeModel.findAllByImageId(imageId);
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async deleteByImageId(req, res) {
        try {
            const { id } = req.params;
            await LikeModel.deleteByImageId(id,req.user.id);
            res.status(200).send("Like removed successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}