const { Movie } = require("../../../database/models");

const init = async function() {
    await Movie.sync({ force: true });
    await Movie.bulkCreate([
        { title: "X", description: "oke", duration: 15, genres: ["horor"], artists: ["dono"], watchURL: "1" },
        { title: "Y", description: "yes", duration: 15, genres: ["komedi"], artists: ["kasino"], watchURL: "2" },
        { title: "Z", description: "done", duration: 15, genres: ["drama"], artists: ["indro"], watchURL: "3" },
        { title: "A", description: "asal", duration: 15, genres: ["horor"], artists: ["dono"], watchURL: "4" },
        { title: "B", description: "bapak", duration: 15, genres: ["komedi", "drama"], artists: ["kasino"], watchURL: "5" },
        { title: "C", description: "senang", duration: 15, genres: ["drama"], artists: ["indro"], watchURL: "6" },
    ], { validate: true });
};

module.exports = init;