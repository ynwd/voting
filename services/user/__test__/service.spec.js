const service = require("../service");
const { sequelize } = require("../../../database/models");

beforeAll(async() => {
    await require("./helper")();
});

afterAll(async() => {
    await sequelize.close();
});

describe("user", () => {
    test("findOne -- success", async() => {
        const user = await service.findOne("bob@martin.com", "secret");
        expect(user.email).toBe('bob@martin.com')
    });

    test("findOne -- fail", async() => {
        const user = await service.findOne("bob@martin.com", "o");
        expect(user).toBe(null)
    });
});

describe("create user", () => {
    test("create -- success", async() => {
        const user = { firstName: "Super", lastName: "Admin", email: "super@admin.com", admin: true }
        const resp = await service.create(user)
        expect(resp.id).toBe(3)
    });
});

describe("update user", () => {
    test("update -- success", async() => {
        const user = { session: null }
        const resp = await service.updateSession(user, 1)
        expect(resp[0]).toBe(1)
    });
});

describe("get user by session", () => {
    test("get user -- success", async() => {
        const user = await service.findOne("bob@martin.com", "secret")
        const session = `${new Date().getTime()}`;
        await service.updateSession({ session }, user.id)

        const resp = await service.getUserBySession(session)
        expect(resp.email).toBe("bob@martin.com")
    });
});

describe("clear session", () => {
    test("clear session -- success", async() => {
        const user = await service.findOne("bob@martin.com", "secret")
        const session = `${new Date().getTime()}`;
        service.updateSession({ session }, user.id)
        const resp = await service.clearSession(user.id, session)
        expect(resp[0]).toBe(1)
    });
});