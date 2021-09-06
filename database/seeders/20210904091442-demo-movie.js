'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const movies = [
            { title: "X", description: "oke", duration: 15, genres: ["horor"], artists: ["dono"], watchURL: "1", view: 0, createdAt: new Date(), updatedAt: new Date() },
            { title: "Y", description: "yes", duration: 15, genres: ["komedi"], artists: ["kasino"], watchURL: "2", view: 0, createdAt: new Date(), updatedAt: new Date() },
            { title: "Z", description: "done", duration: 15, genres: ["drama"], artists: ["indro"], watchURL: "3", view: 0, createdAt: new Date(), updatedAt: new Date() },
            { title: "A", description: "asal", duration: 15, genres: ["horor"], artists: ["dono"], watchURL: "4", view: 0, createdAt: new Date(), updatedAt: new Date() },
            { title: "B", description: "bapak", duration: 15, genres: ["komedi", "drama"], artists: ["kasino"], watchURL: "5", view: 0, createdAt: new Date(), updatedAt: new Date() },
            { title: "C", description: "senang", duration: 15, genres: ["drama"], artists: ["indro"], watchURL: "6", view: 0, createdAt: new Date(), updatedAt: new Date() },
        ]
        return queryInterface.bulkInsert(
            'Movies',
            movies, {}, {
                artists: { type: new Sequelize.JSON() },
                genres: { type: new Sequelize.JSON() }
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Movies', null, {});
    }
};