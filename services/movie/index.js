var handler = require("./handler")

module.exports = function(fastify, opts, done) {
    fastify.get("/movie", handler.findAll);
    fastify.get("/movie/:id", handler.detail);
    fastify.post("/movie", handler.create);
    fastify.put("/movie", handler.update);
    fastify.delete("/movie", handler.delete);

    fastify.get("/movie/mostView", handler.mostView);
    fastify.get("/movie/mostVote", handler.mostVote);

    done();
};

// this options is used for route validation & output serialization
const options = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    duration: { type: "number" },
                    artists: { type: "array" },
                    genres: { type: "array" },
                    watchURL: { type: "string" }
                },
            },
        },
    },
};