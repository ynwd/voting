var service = require("./service")
var userService = require("../user/service")
var movieService = require("../movie/service")


var handler = {}

handler.vote = async function handler(request, reply) {
    const session = request.headers["session"];
    const user = await userService.getUserBySession(session);
    const { movieID } = request.body
    const resp = await service.vote(user.id, movieID)

    const movie = await movieService.findOneByID(movieID)
    const updatemovie = { vote: movie.vote + 1 }
    movieService.update(movieID, updatemovie)

    reply.send(resp);
}

handler.unvote = async function handler(request, reply) {
    const session = request.headers["session"]
    const user = await userService.getUserBySession(session)
    const { movieID } = request.body;
    const resp = await service.unvote(user.id, movieID)

    const movie = await movieService.findOneByID(movieID)
    const updatemovie = { vote: movie.vote - 1 }
    movieService.update(movieID, updatemovie)

    reply.send(resp);
}

module.exports = handler