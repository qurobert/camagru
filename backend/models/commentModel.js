// backend/models/commentModel.js
import knex from "./knexfile.js";

export default class CommentModel {
    static async create(imageId, userId, commentText) {
        if (!imageId || !userId || !commentText) throw new Error('Missing required fields');
        return knex('Comments').insert({
            image_id: imageId,
            user_id: userId,
            comment_text: commentText
        });
    }

    static async findAllByImageId(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        return knex('Comments').select('*').where('image_id', imageId);
    }
}