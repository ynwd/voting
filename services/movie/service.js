const { Op } = require("sequelize");
var { Movie } = require('../../database/models');
const viewService = require('../view/service')

var service = {}


service.findOne = async function(movieID, userID) {
    try {
        var movie = await Movie.findOne({ where: { id: movieID }, raw: true })
        const view = movie.view + 1
        await Movie.update({ view: view }, { where: { id: movieID } })
            // add viewership
            // by movieID and userID
        await viewService.addView(movieID, userID)
        return movie
    } catch (error) {
        return null
    }
}

service.findOneByID = async function(movieID) {
    try {
        var movie = await Movie.findOne({ where: { id: movieID }, raw: true })
        return movie
    } catch (error) {
        return null
    }
}

service.findAll = async function(search) {
    try {
        console.log('search', search)
        if (search) {
            return await Movie.findAll({
                where: {
                    [Op.or]: [{
                            genres: {
                                [Op.contains]: [search]
                            }
                        },
                        {
                            artists: {
                                [Op.contains]: [search]
                            }
                        },
                        { title: search },
                        { description: search }
                    ]
                },
                raw: true
            })
        }

        return await Movie.findAll({ raw: true })
    } catch (error) {
        return null
    }
}

service.create = async function(movie) {
    try {
        return await Movie.create(movie)
    } catch (error) {
        return null
    }
}

service.update = async function(movieID, movie) {
    try {
        return await Movie.update({
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            artists: movie.artists,
            genres: movie.genres,
            watchURL: movie.watchURL,
            view: movie.view,
            vote: movie.vote
        }, { where: { id: movieID } });
    } catch (error) {
        console.log(error)
        return null
    }
}

service.delete = async function(movieID) {
    try {
        return await Movie.destroy({ where: { id: movieID } })
    } catch (error) {
        return null
    }
}

service.mostView = async function() {
    try {
        const most = await Movie.findAll({
            order: [
                ['view', 'ASC'],
            ],
            raw: true
        })

        return most.map((v) => {
            return {
                title: v.title,
                view: v.view
            }
        })

    } catch (error) {
        return null
    }
}

service.mostVote = async function() {
    try {
        const most = await Movie.findAll({
            order: [
                ['vote', 'ASC'],
            ],
            raw: true
        })

        return most.map((v) => {
            return {
                title: v.title,
                vote: v.vote
            }
        })
    } catch (error) {
        return null
    }
}

module.exports = service