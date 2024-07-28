// backend/models/commentModel.js
import knex from "./knexfile.js";
import UserModel from "./userModel.js";

export default class CommentModel {
    static async create(imageId, userId, commentText) {
        if (!imageId || !userId || !commentText) throw new Error('Missing required fields');
        await UserModel.notifyUser(userId, 'comment');
        return knex('Comments').insert({
            image_id: imageId,
            user_id: userId,
            comment_text: commentText
        });
    }

    static async findAllByImageId(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        const comments = await knex('Comments')
            .join('Users', 'Comments.user_id', 'Users.id')
            .select('Comments.*', 'Users.username')
            .where('image_id', imageId);
        return comments;
    }

    static async deleteAllByImageId(imageId) {
        if (!imageId) throw new Error('Missing required fields');
        return knex('Comments').where('image_id', imageId).del();
    }
}