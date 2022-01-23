const Controllers = require("./authController");
const Services = require("../services/users/index");
const User = require('../database/models/users/index');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

jest.mock("bcrypt");

describe("authControllers Test Suite", () => {
    let mockReq;
    let mockRes;

    const json = { json: (response) => response };

    beforeEach(() => {
      mockReq = {
        params: {}, body: {}, query: {}
      };
      mockRes = { status: jest.fn().mockReturnValue(json) };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("login function", () => {
        const { login } = Controllers;

        it("should be defined", () => {
            expect(login).toBeDefined();
        });

        it("success response", async() => {
            const fakeUsername = "fake-username";
            const fakeEmail = "fake-email";
            const fakePassword = "fake-password";
            mockReq.body = {
                email: fakeEmail,
                password: fakePassword
            };

            const fakeUser = getUser(fakeUsername, fakeEmail, fakePassword);
            const spy = spyUsersFindOne(fakeUser);

            const fakeVal = true;
            const mockBcryptCompare = jest.fn(() => fakeVal);
            const mockBcrypt = jest.fn(() => ({ compare: mockBcryptCompare }));
            bcrypt.mockImplementation(mockBcrypt);

            const result = await Controllers.login(mockReq, mockRes);
            console.log("🚀 ~ file: authController.test.js ~ line 50 ~ it ~ result", result)

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toMatchObject({ fakeEmail });

            expect(mockBcrypt).toHaveBeenCalledTimes(1);
            console.log(mockBcrypt.mock.calls[0][0]);
            expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
            expect(mockBcryptCompare.mock.calls[0][0]).toBe(fakePassword);
            expect(mockBcryptCompare.mock.calls[0][1]).toBe(fakePassword);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);
        });

        // it("should failed response", async() => {
        //     const fakeError = new Error("fake-error");
        //     spyUsersFindOne(fakeError, false);

        //     const result = await Controllers.login(mockReq, mockRes);
        //     console.log("🚀 ~ file: authController.test.js ~ line 71 ~ it ~  result",  result)
            
        //     expect(mockRes.status).toHaveBeenCalledTimes(1);
        //     expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);
            
        // })
    });

    describe("register function", () => {
        const { register } = Controllers;

        it("should be defined", () => {
            expect(register).toBeDefined();
        });
    })
});


const spyUsersFindOne = (result, isResolve = true) => (isResolve
    ? jest.spyOn(User, 'findOne').mockResolvedValue(result)
    : jest.spyOn(User, 'findOne').mockRejectedValue(result));

const getUser = (username, email, password) => ({
    userId: 'fake-user-id',
    username,
    email,
    password
});
