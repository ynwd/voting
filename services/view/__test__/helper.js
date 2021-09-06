const { View } = require("../../../database/models");

const init = async function() {
    await View.sync({ force: true })
    await View.bulkCreate([{
        userID: 1,
        movies: [{
            movieID: 1,
            view: 1
        }, {
            movieID: 2,
            view: 1
        }]
    }, ], { validate: true });
};

module.exports = init;