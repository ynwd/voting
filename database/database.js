var host = process.env.DB_HOST ? process.env.DB_HOST : "localhost"
module.exports = {
    development: {
        username: "root",
        password: "root",
        database: "test",
        host: host,
        port: "5432",
        dialect: 'postgres'
    },
    test: {
        username: "root",
        password: "root",
        database: "test",
        host: host,
        port: "5432",
        dialect: 'postgres'
    },
    production: {
        username: "root",
        password: "root",
        database: "test",
        host: host,
        port: "5432",
        dialect: 'postgres'
    }
};