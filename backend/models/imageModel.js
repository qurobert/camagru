import knex from "./knexfile.js";
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export default class ImageModel {
    static async create(userId, overlayPath, backgoundPath) {
        // Process the image with sharp and save the processed image
        console.log(overlayPath, backgoundPath)
        if (!userId || !overlayPath || !backgoundPath) throw new Error('Missing required fields');
        const processedBackgoundPath = path.join('uploads', `processed_background_${Date.now()}.png`);
        const processedOverlayPath = path.join('uploads', `processed_overlay_${Date.now()}.png`);
        const outputPath = path.join('uploads', `processed_${Date.now()}.png`);
        const backgroundBuffer =  await sharp(backgoundPath)
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
        return knex('Images').insert({
            user_id: userId,
            original_path: "null",
            processed_path: outputPath,
            created_at: new Date(),
        });
    }

    static async findAllByUserId(userId) {
        if (!userId) throw new Error('Missing required fields');
        return knex('Images').select('*').where('user_id', userId);
    }

    static async deleteById(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        const image = await knex('Images').select('processed_path').where('id', imageId).first();
        if (image) {
            // Delete the file from storage
            fs.unlinkSync(image.processed_path);
            // Remove the record from database
            return knex('Images').where('id', imageId).del();
        }
        throw new Error('Image not found');
    }
}
