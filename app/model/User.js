import knex from "./knexfile.js";

export default class User {
    static async findAll() {
        return knex('Users').select('*')
    }
}
