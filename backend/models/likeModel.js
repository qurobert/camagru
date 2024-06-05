// backend/models/likeModel.js
import knex from "./knexfile.js";

export default class LikeModel {
    static async create(imageId, userId) {
        if (!imageId || !userId) throw new Error('Missing imageId required fields');
        // If like is already present, return an error
        const existingLike = await knex('Likes').where('image_id', imageId).andWhere('user_id', userId);
        if (existingLike.length > 0) throw new Error('Like already exists');
        return knex('Likes').insert({
            image_id: imageId,
            user_id: userId
        });
    }

    static async findAllByImageId(imageId) {
        if (!imageId) throw new Error('Missing imageId required fields');
        return knex('Likes').select('*').where('image_id', imageId);
    }

    static async deleteByImageId(imageId, userId) {
        if (!imageId) throw new Error('Missing imageId required fields');
        return knex('Likes').where('image_id', imageId).andWhere('user_id', userId).del();
    }
}