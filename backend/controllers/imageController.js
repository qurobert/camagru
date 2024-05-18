import ImageModel from "../models/imageModel.js";

export default class ImageController {
    static async create(req, res) {
        try {
            const { userId } = req.body;
            const imagePath = req.file.path;// path where multer stores the image
            await ImageModel.create(userId, imagePath);
            res.status(201).send("Image created and saved successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAll(req, res) {
        try {
            const { userId } = req.query;
            const images = await ImageModel.findAllByUserId(userId);
            res.status(200).json(images);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await ImageModel.deleteById(id);
            res.status(200).send("Image deleted successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
