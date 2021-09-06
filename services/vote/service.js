var { Vote } = require('../../database/models');

async function createVote(userID, movidID) {
    try {
        const vote = {
            userID,
            votes: [movidID]
        }
        const resp = await Vote.create(vote);
        if (resp) {
            return [1]
        }
        return [0]
    } catch (error) {
        console.log(error)
        return null
    }
}

async function addVote(existing, userID, movieID) {
    try {
        const exist = existing.votes.filter((v) => {
            return v === movieID
        })
        if (exist.length > 0) return null

        existing.votes.push(movieID)
        const resp = await Vote.update({
            votes: existing.votes
        }, { where: { userID } });
        return resp
    } catch (error) {
        console.log(error)
        return null
    }
}

async function unVote(existing, userID, movieID) {
    try {
        const filtered = existing.votes.filter((v) => {
            return v !== movieID
        })

        const resp = await Vote.update({
            votes: filtered
        }, { where: { userID } });
        return resp
    } catch (error) {
        console.log(error)
        return null
    }
}

var service = {}

service.vote = async function(userID, movieID) {
    try {
        var existing = await Vote.findOne({ where: { userID }, raw: true })
        if (!existing) return createVote(movieID, userID)
        return addVote(existing, userID, movieID)
    } catch (error) {
        console.log(error)
        return null
    }
}

service.unvote = async function(userID, movieID) {
    try {
        var existing = await Vote.findOne({ where: { userID }, raw: true })
        return unVote(existing, userID, movieID)
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = service