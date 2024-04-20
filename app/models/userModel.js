import knex from "./knexfile.js";

export default class UserModel {
    static async findOne(email) {
        return knex('Users').select('*').where({email}).first()
    }

    static async register(email, password) {
        return knex('Users').insert({email, password, verification_status: false})
    }

    static async verify_email(email) {
        return knex('Users').where({email}).update({verification_status: true})
    }

}
