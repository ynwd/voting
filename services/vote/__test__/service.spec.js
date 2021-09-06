const service = require("../service");
const { sequelize, Vote } = require("../../../database/models");

beforeAll(async() => {
    await Vote.sync({ force: true })
});

afterAll(async() => {
    await sequelize.close();
});

describe("movie's votes", () => {
    test("create vote -- success", async() => {
        const v = await service.vote(1, 1)
        expect(v[0]).toBe(1)
    });
    test("add new vote -- success", async() => {
        const v = await service.vote(1, 2)
        expect(v[0]).toBe(1)
    });

    test("vote for same movie -- failed - exist", async() => {
        const v = await service.vote(1, 2)
        expect(v).toBe(null)
    });

    test("unvote vote -- success", async() => {
        const v = await service.unvote(1, 2)
        expect(v[0]).toBe(1)
    });
});