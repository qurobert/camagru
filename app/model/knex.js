const knex = require('knex');

module.exports = knex({
    client: 'mysql',
    connection: {
        database: 'mydatabase',
        user: 'root',
        password: 'secret',
        host: 'db',
        port: '3306'
    }
});
