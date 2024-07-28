import knex from "./knexfile.js";
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import CommentModel from "./commentModel.js";
import LikeModel from "./likeModel.js";
import UserModel from "./userModel.js";

export default class ImageModel {
    static async create(overlayPath, backgroundPath) {
        // Process the image with sharp and save the processed image
        if (!overlayPath || !backgroundPath) throw new Error('Missing required fields');
        const outputPath = path.join('uploads', `processed_${Date.now()}.png`);
        const backgroundBuffer =  await sharp(backgroundPath)
            .resize(800, 800)
            .toBuffer();

        const overlayBuffer = await sharp(overlayPath)
            .resize(800, 800)
            .ensureAlpha()
            .composite([{ input: Buffer.from([255, 255, 255, 150]), raw: { width: 1, height: 1, channels: 4 }, tile: true }])
            .toBuffer();

        await sharp(backgroundBuffer)
            .composite([{ input: overlayBuffer, blend: 'overlay' }])
            .toFile(outputPath);

        // Insert image data into database
            // .returning('id') for the front end
        return outputPath;
    }

    static async publish(userId, processedPath) {
        if (!userId || !processedPath) throw new Error('Missing required fields');
        return knex('Images').insert({
            user_id: userId,
            original_path: "null",
            processed_path: processedPath,
            created_at: new Date(),
        });
    }

    static async findAllByUserId(userId) {
        if (!userId) throw new Error('Missing required fields');
        return knex('Images').select('*').where('user_id', userId);
    }

    static async getAllByPage(page) {
        let images = []
        const limitPerPage = 5;
        const offset = (page - 1) * limitPerPage;
        images = await knex('Images').select('*').limit(limitPerPage).offset(offset);
        for (let image of images) {
            image.username = (await UserModel.findById(image.user_id)).username;
            image.comments = await CommentModel.findAllByImageId(image.id);
            image.likes = await LikeModel.findAllByImageId(image.id);
        }
        return images
    }

    static async deleteById(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        const image = await knex('Images').select('processed_path', 'user_id').where('id', imageId).first();
        if (!image) throw new Error('Image not found');
        await CommentModel.deleteAllByImageId(imageId);
        await LikeModel.deleteAllByImageId(imageId);
        if (image) {
            // Remove the record from database
            await knex('Images').where('id', imageId).del();
            // Delete the file from storage
            fs.unlinkSync(image.processed_path)
        }
    }
}
