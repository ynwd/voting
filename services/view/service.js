var { View } = require('../../database/models');

async function createView(movieID, userID) {
    try {
        const view = {
            userID,
            movies: [{
                movieID,
                view: 1
            }]
        }
        const resp = await View.create(view);
        return resp
    } catch (error) {
        console.log(error)
        return null
    }
}

async function updateView(existing, viewer, movieID) {
    try {
        const filtered = existing.movies.map((v, i) => {
            return { v, i };
        }).filter((m) => {
            return m.v.movieID === movieID
        })

        var f = filtered[0]
        f.v.view = f.v.view + 1
        existing.movies[f.i] = f.v

        const view = {
            movies: existing.movies
        }
        const resp = await View.update(view, {
            where: {
                userID: viewer
            }
        })
        return resp
    } catch (error) {
        console.log(error)
        return null
    }
}
var service = {}

service.addView = async function(movieID, userID) {
    try {
        var existing = await View.findOne({ where: { userID }, raw: true })
        if (!existing) return createView(movieID, userID)
        return updateView(existing, userID, movieID)
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = service