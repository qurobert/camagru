const knex = require('./db')
class User {
    static async findAll() {
        return knex('users').select('*')
    }
}

module.exports = User