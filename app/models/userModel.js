import knex from "./knexfile.js";

export default class UserModel {
    constructor() {
        // this.knex = knex('Users')
    }
    static async findOne(email) {
        return knex('Users').select('*').where({email})
    }

    static async findById(id) {
        return knex('Users').select('*').where({id})
    }

    static async create(email, password) {
        return knex('Users').insert({email, password, verification_status: false})
    }

    static async verify_email(email) {
        return knex('Users').where({email}).update({verification_status: true})
    }

}
