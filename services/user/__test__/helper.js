const { User } = require("../../../database/models");

const init = async function() {
    await User.sync({ force: true });
    const session = `${new Date().getTime()}`;
    await User.bulkCreate([
        { firstName: "Bob", lastName: "Martin", email: "bob@martin.com", password: "secret", admin: false, session: session },
        { firstName: "Linus", lastName: "Torvalds", email: "linus@torvalds.com", admin: false },
    ], { validate: true });
};

module.exports = init;