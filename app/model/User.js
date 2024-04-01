import knex from "./knexfile.js";

export default class User {
    static async findUser(email, password) {
        return knex('Users').select('*')
    }

    static async register(email, password) {
        return knex('Users').insert({email, password, verification_status: false})
    }

    static async verify_email(email) {
        return knex('Users').where({email}).update({verification_status: true})
    }

}
