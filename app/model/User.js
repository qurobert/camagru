const knex = require('./knex')
class User {
    static async findAll() {
        return knex('users').select('*')
    }
}

module.exports = User