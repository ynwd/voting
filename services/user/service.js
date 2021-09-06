var { User } = require('../../database/models');

var service = {}

service.findOne = async function(email, password) {
    try {
        const user = await User.findOne({
            where: {
                email,
                password
            },
            raw: true
        })
        return user
    } catch (error) {
        return null
    }
}

service.getUserBySession = async function(session) {
    try {
        return await User.findOne({ where: { session }, raw: true })
    } catch (error) {
        console.log(error)
        return null
    }
}

service.updateSession = async function(user, userID) {
    try {
        return await User.update({
            session: user.session
        }, {
            where: { id: userID },
            raw: true
        })
    } catch (error) {
        return null
    }
}

service.clearSession = async function(id, session) {
    try {
        return await User.update({
            session: null
        }, {
            where: { id, session },
            raw: true
        })
    } catch (error) {
        return null
    }
}

service.create = async function(user) {
    try {
        return await User.create(user)
    } catch (error) {
        return null
    }
}

module.exports = service