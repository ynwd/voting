var service = require("./service")
var handler = {}

handler.login = async function handler(request, reply) {
    const { email, password } = request.body;
    const user = await service.findOne(email, password)
    if (!user) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }

    const session = `${new Date().getTime()}`;
    const data = await service.updateSession({ session }, user.id)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send({
        data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userID: user.id,
            session: session,
        },
        message: "login success"
    });
}

handler.logout = async function handler(request, reply) {
    const { session, userID } = request.body;
    const data = await service.clearSession(userID, session)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}

handler.register = async function handler(request, reply) {
    const { firstName, lastName, email, password } = request.body;
    const user = { firstName, lastName, email, password }
    const data = await service.create(user)
    if (!data) {
        return reply.code(404).send({ error: true, code: 404, message: "not found" }, );
    }
    reply.send(data);
}


module.exports = handler