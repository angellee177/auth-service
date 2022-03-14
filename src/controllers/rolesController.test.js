 const Controllers = require("./rolesController")
    , Services = require("../services/roles/index")
    , { StatusCodes } = require("http-status-codes");

describe("rolesControllers Test Suite", () => {
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
    
    describe("createNewRoles function", () => {
        const { createNewRoles } = Controllers;

        it("should be defined", () => {
            expect(createNewRoles).toBeDefined();
        });

        it("success response", async() => {
            const fakeEmail = "fake-email"
                , fakeCode = "fake-code"
                , fakeName = "fake-name";
            mockReq = {
                headers: { email: fakeEmail },
                body: {
                    code: fakeCode,
                    name: fakeName,
                },
            };

            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);
            const spy = spyCreateNewRole(fakeRole);

            const result = await createNewRoles(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeCode);
            expect(spy.mock.calls[0][1]).toBe(fakeName);
            expect(spy.mock.calls[0][2]).toBe(fakeEmail);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: fakeRole,
            });
        });

        it("fail response", async() => {
            const fakeEmail = "fake-email"
                , fakeCode = "fake-code"
                , fakeName = "fake-name";
            mockReq = {
                headers: { email: fakeEmail },
                body: {
                    code: fakeCode,
                    name: fakeName,
                },
            };

            const fakeError = new Error("fake-error");
            const spy = spyCreateNewRole(fakeError, false);

            const result = await createNewRoles(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeCode);
            expect(spy.mock.calls[0][1]).toBe(fakeName);
            expect(spy.mock.calls[0][2]).toBe(fakeEmail);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    });

        
    describe("updatingRole function", () => {
        const { updatingRole } = Controllers;

        it("should be defined", () => {
            expect(updatingRole).toBeDefined();
        });

        it("success response", async() => {
            const fakeEmail = "fake-email"
                , fakeCode = "fake-code"
                , fakeName = "fake-name";
            
            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);

            mockReq = {
                params: { roleId: fakeRole['id'] },
                body: {
                    name: fakeName,
                },
            };

            const spy = spyUpdateRole(true);

            const result = await updatingRole(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeRole['id']);
            expect(spy.mock.calls[0][1]).toBe(fakeName);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: true,
            });
        });

        it("fail response", async() => {
            const fakeEmail = "fake-email"
            , fakeCode = "fake-code"
            , fakeName = "fake-name";
        
            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);

            mockReq = {
                params: { roleId: fakeRole['id'] },
                body: {
                    name: fakeName,
                },
            };

            const fakeError = new Error("fake-error");
            const spy = spyUpdateRole(fakeError, false);

            const result = await updatingRole(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeRole['id']);
            expect(spy.mock.calls[0][1]).toBe(fakeName);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    });

    describe("role function", () => {
        const { role } = Controllers;

        it("should be defined", () => {
            expect(role).toBeDefined();
        });

        it("success response", async() => {
            const fakeEmail = "fake-email"
                , fakeCode = "fake-code"
                , fakeName = "fake-name";
            
            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);

            mockReq = {
                params: { roleId: fakeRole['id'] },
                body: {
                    name: fakeName,
                },
            };

            const spy = spyRole(fakeRole);

            const result = await role(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeRole['id']);
            expect(spy.mock.calls[0][1]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: fakeRole,
            });
        });

        it("fail response", async() => {
            const fakeEmail = "fake-email"
            , fakeCode = "fake-code"
            , fakeName = "fake-name";
        
            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);

            mockReq = {
                params: { roleId: fakeRole['id'] },
            };

            const fakeError = new Error("fake-error");
            const spy = spyRole(fakeError, false);

            const result = await role(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeRole['id']);
            expect(spy.mock.calls[0][1]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    });

    describe("roles function", () => {
        const { roles } = Controllers;

        it("should be defined", () => {
            expect(roles).toBeDefined();
        });

        it("success response", async() => {
            const fakeEmail = "fake-email"
                , fakeCode = "fake-code"
                , fakeName = "fake-name";
            
            const fakeRole = getRole(fakeCode, fakeName, fakeEmail);

            const spy = spyGetRoles({
                roles: [fakeRole],
                total: [fakeRole].length,
            });

            const result = await roles(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: {
                    roles: [fakeRole],
                    total: 1,
                },
            });
        });

        it("no roles response", async() => {
            const spy = spyGetRoles({
                roles: [],
                total: [].length,
            });

            const result = await roles(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: {
                    roles: [],
                    total: 0,
                },
            });
        });

        it("fail response", async() => {

            const fakeError = new Error("fake-error");
            const spy = spyGetRoles(fakeError, false);

            const result = await roles(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    });


    describe("deleteRole function", () => {
        const { deleteRole } = Controllers;

        it("should be defined", () => {
            expect(deleteRole).toBeDefined();
        });

        it("success response", async() => {
            const fakeID = "fake-id";
            mockReq = {
                params: { roleId: fakeID },
            };

            const spy = spyDeleteRole(true);

            const result = await deleteRole(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeID);
            expect(spy.mock.calls[0][1]).toBeUndefined();

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

            expect(result).toMatchObject({
                success: true,
                message: 'success',
                result: true,
            });
        });

        it("fail response", async() => {
            const fakeID = "fake-id";
            mockReq = {
                params: { roleId: fakeID },
            };

            const fakeError = new Error("fake-error");
            const spy = spyDeleteRole(fakeError, false);

            const result = await deleteRole(mockReq, mockRes);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBe(fakeID);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

            expect(result).toMatchObject({
                success: false,
                message: fakeError['message'],
            });
        });
    });
});

const spyCreateNewRole = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'newRole').mockResolvedValue(result)
    : jest.spyOn(Services, 'newRole').mockRejectedValue(result));

const spyUpdateRole = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'updateRole').mockResolvedValue(result)
    : jest.spyOn(Services, 'updateRole').mockRejectedValue(result));

const spyRole = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'getRole').mockResolvedValue(result)
    : jest.spyOn(Services, 'getRole').mockRejectedValue(result));

const spyGetRoles = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'roles').mockResolvedValue(result)
    : jest.spyOn(Services, 'roles').mockRejectedValue(result));

const spyDeleteRole = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Services, 'deleteRole').mockResolvedValue(result)
    : jest.spyOn(Services, 'deleteRole').mockRejectedValue(result));

const getRole = (code = "fake-code", name, email) => ({
    id: "fake-id",
    code,
    name,
    email,
});
