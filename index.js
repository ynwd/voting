const fastify = require('fastify')({ logger: true })

require("dotenv").config();

fastify
    .register(require("./services/index"))
    .register(require("./services/movie"))
    .register(require("./services/user"))
    .register(require("./services/vote"))
    .listen(process.env.APP_PORT, process.env.APP_HOST, function(err, address) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.log.info(`server listening on ${address}`);
    });