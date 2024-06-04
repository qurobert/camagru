// backend/controllers/commentController.js
import CommentModel from "../models/commentModel.js";

export default class CommentController {
    static async create(req, res) {
        try {
            const { imageId, commentText } = req.body;
            const userId = req.user.id;
            await CommentModel.create(imageId, userId, commentText);
            res.status(201).send("Comment created successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAll(req, res) {
        try {
            const { imageId } = req.params;
            const comments = await CommentModel.findAllByImageId(imageId);
            res.status(200).json(comments);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await CommentModel.deleteById(id);
            res.status(200).send("Comment deleted successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}