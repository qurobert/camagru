import knex from "./knexfile.js";
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export default class ImageModel {
    static async create(userId, imagePath) {
        // Process the image with sharp and save the processed image
        if (!userId || !imagePath) throw new Error('Missing required fields');
        const filename = path.basename(imagePath);
        const output = `processed_${filename}`;
        const outputPath = path.join(path.dirname(imagePath), output);

        await sharp(imagePath)
            .resize(700, 700) // Example resize, customize as needed
            .toFile(outputPath);

        // Insert image data into database
        return knex('Images').insert({
            user_id: userId,
            original_path: imagePath,
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
