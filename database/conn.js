module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "latihan",
        timezone: "UTC",
        charset  : 'utf8mb4_unicode_ci',
    }
});