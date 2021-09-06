const service = require("../service");
const { sequelize } = require("../../../database/models");
const { update } = require("../service");

beforeAll(async() => {
    await require("./helper")();
});

afterAll(async() => {
    await sequelize.close();
});

describe("find movie", () => {
    test("findAll -- success", async() => {
        const movies = await service.findAll();
        expect(movies.length).toBe(6)
    });

    test("findAll by genre -- success", async() => {
        const movies = await service.findAll("komedi");
        expect(movies.length).toBe(2)
    });

    test("findAll by title -- success", async() => {
        const movies = await service.findAll("X");
        expect(movies.length).toBe(1)
    });

    test("findAll by description -- success", async() => {
        const movies = await service.findAll("oke");
        expect(movies.length).toBe(1)
    });

    test("findAll by artist -- success", async() => {
        const movies = await service.findAll("dono");
        expect(movies.length).toBe(2)
    });
});


describe("create movie", () => {
    test("create -- success", async() => {
        const movie = { title: "D", description: "bahagia", duration: 15, genres: ["drama"], artists: ["bruce"], watchURL: "7" }
        await service.create(movie)
        const movies = await service.findAll()
        expect(movies.length).toBe(7)
    });
});

describe("update movie", () => {
    test("update -- success", async() => {
        const movie = { description: "gembira", artists: ["oke"] }
        const updt = await service.update(6, movie)
        expect(updt[0]).toBe(1)
    });
});

describe("delete movie", () => {
    test("delete -- success", async() => {
        const rslt = await service.delete(6)
        expect(rslt).toBe(1)
    });
});

describe("find one", () => {
    test("find one -- success", async() => {
        const rslt = await service.findOne(1)
        expect(rslt.id).toBe(1)
    });
});

describe("most view", () => {
    test("most view -- success", async() => {
        const rslt = await service.mostView()
        expect(rslt[0].view).toBe(1)
    });
});


// var filterByTerm = require("../filter");
// // import * as myFile from "../filter";

// describe("movie", () => {
//     test("it should filter by a search term (link)", () => {
//         jest.mock("../filter");

//         filterByTerm = jest.fn().mockImplementation(() => {
//             return [{ id: 3, url: "https://www.link3.dev" }];
//         });

//         const input = [
//             { id: 1, url: "https://www.url1.dev" },
//             { id: 2, url: "https://www.url2.dev" },
//             // { id: 3, url: "https://www.link3.dev" }
//         ];

//         const output = [{ id: 3, url: "https://www.link3.dev" }];
//         expect(filterByTerm(input, "link")).toEqual(output);
//     });
// });

// it("returns undefined and has been called correct number of times", () => {
//     const mock = jest.fn();
//     const result = mock();

//     expect(result).toBeUndefined();
//     expect(mock).toHaveBeenCalledTimes(1);
//     expect(mock).toHaveBeenCalledWith();
// });

// it("has been called with correct arguments and returns a correct value", () => {
//     const mock = jest
//         .fn()
//         .mockReturnValueOnce("first return")
//         .mockReturnValueOnce("second return")
//         .mockReturnValueOnce("third return")

//     const resultFirst = mock("first call");
//     const resultSecond = mock("second call");
//     const resultThird = mock("third call");

//     expect(mock).toHaveBeenCalledTimes(3);

//     expect(resultFirst).toBe("first return");
//     expect(resultSecond).toBe("second return");
//     expect(resultThird).toBe("third return");

//     expect(mock).toHaveBeenNthCalledWith(1, "first call");
//     expect(mock).toHaveBeenNthCalledWith(2, "second call");
// });

// const helpers = require("./helper");

// it("returns correct result", () => {
//     const addMock = jest.spyOn(helpers, "add");

//     const result = addMock(1, 2);

//     // look, in contrast to jest.fn() that returns undefined by default
//     // jest.spyOn() calls original implementation
//     expect(result).toBe(3);
// });

// it("returns mocked and original result", () => {
//     const addMock = jest.spyOn(helpers, "add");
//     addMock.mockImplementation(() => 4);

//     // redefined implementation
//     expect(helpers.add()).toBe(4);

//     addMock.mockRestore();

//     // original implementation
//     expect(helpers.add(1, 2)).toBe(3);
// });

// it("mocks entire module", () => {
//     helpers.add = jest.fn();
//     helpers.sub = jest.fn();

//     expect(helpers.add.mock).toBeTruthy();
//     expect(helpers.sub.mock).toBeTruthy();
// });