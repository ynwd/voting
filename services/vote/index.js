var handler = require("./handler")

module.exports = function(fastify, opts, done) {
    fastify.post("/vote", handler.vote);
    fastify.post("/unvote", handler.unvote);
    done();
};