import knex from 'knex';

export default knex({
    client: 'mysql2',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_HOST_PORT
    }
});
