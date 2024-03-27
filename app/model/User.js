const knex = require('./knex')
class User {
    static async findAll() {
        return knex('Users').select('*')
    }
}

module.exports = User