const service = require("../service");
const { sequelize } = require("../../../database/models");

beforeAll(async() => {
    await require("./helper")();
});

afterAll(async() => {
    await sequelize.close();
});

describe("movie's viewership", () => {
    test("add -- success", async() => {
        const view = await service.addView(1, 3)
        expect(view.movies.length).toBe(1)
    });

    test("update existing view -- success", async() => {
        const view = await service.addView(2, 1)
        expect(view[0]).toBe(1)
    });
});