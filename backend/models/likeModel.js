// backend/models/likeModel.js
import knex from "./knexfile.js";

export default class LikeModel {
    static async create(imageId, userId) {
        if (!imageId || !userId) throw new Error('Missing required fields');
        return knex('Likes').insert({
            image_id: imageId,
            user_id: userId
        });
    }

    static async findAllByImageId(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        return knex('Likes').select('*').where('image_id', imageId);
    }

    static async deleteById(likeId) {
        if (!likeId) throw new Error('Missing required fields');
        return knex('Likes').where('id', likeId).del();
    }
}