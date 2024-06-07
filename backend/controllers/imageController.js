import ImageModel from "../models/imageModel.js";

export default class ImageController {
    static async create(req, res) {
        try {
            const filterPath = req.files.filter[0].path;
            const imagePath = req.files.image[0].path;
            const path = await ImageModel.create(filterPath, imagePath);
            res.status(201).json({ processed_path: path });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async publish(req, res) {
        try {
            const userId = req.user.id;
            const processed_path = req.body.processed_path;
            await ImageModel.publish(userId, processed_path);
            res.status(201).send("Image published successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAllFromUser(req, res) {
        try {
            const userId = req.user.id;
            const images = await ImageModel.findAllByUserId(userId);
            res.status(200).json(images);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async getAll(req, res) {
        try {
            const page = req.params.page || 1;
            const images = await ImageModel.getAllByPage(page);
            res.status(200).json(images);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await ImageModel.deleteById(id, req.user.id);
            res.status(200).send("Image deleted successfully.");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
