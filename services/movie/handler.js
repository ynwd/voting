var service = require("./service")
var userService = require("../user/service")

var handler = {}

handler.findAll = async function handler(request, reply) {
    await validateUser(request, reply)
    var search = request.query["search"]
    console.log("search", search)
    const data = await service.findAll(search)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}

handler.create = async function handler(request, reply) {
    await validateAdmin(request, reply)
    const { title, description, duration, genres, artists } = request.body
    const movie = {
        title,
        description,
        duration,
        genres,
        artists
    }

    const data = await service.create(movie)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "create fail" }, );
    }
    reply.send(data);
}

handler.update = async function handler(request, reply) {
    await validateAdmin(request, reply)
    const { id, title, description, duration, genres, artists, watchURL } = request.body
    const movie = {
        id,
        title,
        description,
        duration,
        genres,
        artists,
        watchURL
    }
    const data = await service.update(id, movie)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "update fail" }, );
    }
    reply.send(data);
}

handler.delete = async function handler(request, reply) {
    await validateAdmin(request, reply)
    const movieID = ""
    const data = await service.delete(movieID)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "delete fail" }, );
    }
    reply.send(data);
}

handler.detail = async function handler(request, reply) {
    await validateUser(request, reply)
    const { id } = request.params
    const userID = request.headers["userid"]
    const data = await service.findOne(id, userID)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}

handler.mostView = async function handler(request, reply) {
    await validateAdmin(request, reply)
    const data = await service.mostView()
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}

handler.mostVote = async function handler(request, reply) {
    await validateAdmin(request, reply)
    const data = await service.mostVote()
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}

async function validateAdmin(request, reply) {
    const session = request.headers["session"];
    if (!session) {
        return reply.send("harus login dulu");
    }
    const user = await userService.getUserBySession(session);
    if (user && !user.admin) {
        return reply.send("harus admin");
    }
}

async function validateUser(request, reply) {
    const session = request.headers["session"];
    if (!session) {
        return reply.send("harus login dulu");
    }
}

module.exports = handler