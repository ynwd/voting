module.exports = function(fastify, opts, done) {
    fastify.get("/", function handler(request, reply) {
        reply.send("hello");
    });
    done();
};