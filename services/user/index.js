"use strict";
var handler = require("./handler")

module.exports = function(fastify, opts, done) {
    fastify.post("/login", handler.login);
    fastify.post("/logout", handler.logout);
    fastify.post("/register", handler.register);
    done();
};