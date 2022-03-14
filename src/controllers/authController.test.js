const Controllers = require("./authController");
const Services = require("../services/users/index");
const { StatusCodes } = require('http-status-codes');

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
            const fakeEmail = "fake-email";
            const fakePassword = "fake-password";
            mockReq.body = {
                email: fakeEmail,
                password: fakePassword
            };

            const fakeToken = "fake-token";

            const spy = spyGenerateAuthToken(fakeToken);

            const result = await Controllers.login(mockReq, mockRes);
           
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeEmail);
            expect(spy.mock.calls[0][1]).toBe(fakePassword);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);
            
            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: fakeToken,
            });
        });

        it("should failed response", async() => {
            const fakeEmail = "fake-email";
            const fakePassword = "fake-password";
            mockReq.body = {
                email: fakeEmail,
                password: fakePassword
            };

            const fakeError = new Error("fake-error");
            const spy = spyGenerateAuthToken(fakeError, false);

            const result = await Controllers.login(mockReq, mockRes);   

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeEmail);
            expect(spy.mock.calls[0][1]).toBe(fakePassword);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);
            
            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        })
    });

    describe("register function", () => {
        const { register } = Controllers;

        it("should be defined", () => {
            expect(register).toBeDefined();
        });

        it("success response", async() => {
            const fakeUsername = "fake-username";
            const fakeFullname = "fake-fullname";
            const fakeEmail = "fake-email";
            const fakePassword = "fake-password";
            mockReq.body = {
                username: fakeUsername,
                email: fakeEmail,
                password: fakePassword,
                fullname: fakeFullname,
            };
            
            const fakeUser = getUser(fakeEmail, fakePassword, fakeFullname);
            const spy = spyRegisterService(fakeUser);

            const result = await register(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toMatchObject(mockReq.body);
            expect(spy.mock.calls[0][1]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: fakeUser,
            });
        });

        it("failed response", async() => {
            const fakeUsername = "fake-username";
            const fakeFullname = "fake-fullname";
            const fakeEmail = "fake-email";
            const fakePassword = "fake-password";
            mockReq.body = {
                username: fakeUsername,
                email: fakeEmail,
                password: fakePassword,
                fullname: fakeFullname,
            };
            
            const fakeError = new Error("fake-error");
            const spy = spyRegisterService(fakeError, false);

            const result = await register(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toMatchObject(mockReq['body']);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    })
});

const spyGenerateAuthToken = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'generateAuthToken').mockResolvedValue(result)
    : jest.spyOn(Services, 'generateAuthToken').mockRejectedValue(result));

const spyRegisterService = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'register').mockResolvedValue(result)
    : jest.spyOn(Services, 'register').mockRejectedValue(result));

const getUser = (email, password, fullname) => ({
    userId: 'fake-user-id',
    username: "fake-username",
    email,
    password,
    fullname,
});
