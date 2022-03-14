const User = require('../../database/models/users');
const Service = require('./index');
const { StatusCodes } = require('http-status-codes');
const { roles: ROLE } = require('../../config/constant'); 
const Auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');

jest.mock('bcrypt');
jest.mock('../../database/models/users');
describe("Users Services Test Suite", () => {
    beforeEach(() => { 
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("register function", () => {
        const { register } = Service;

        it("should be defined", () => {
            expect(register).toBeDefined();
        });

        it("success response", async() => {
            const fakeUsers = getUsers();

            const mockUserSave = jest.fn()
                .mockResolvedValueOnce(true);
            User.save = mockUserSave;

            const spy = spyUserFindOne(null);
            
            const result = await Service.register(fakeUsers[0]);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toMatchObject({ email: fakeUsers[0]['email'] });
            
            expect(result).toBeTruthy();
        });

        it("success response with default value", async() => {
            const fakeUsers = {
                username: "fake-username",
                email: "fake-meail",
                password: "fake-password",
                fullname: "fake-fullname",
            };

            const mockUserSave = jest.fn()
                .mockResolvedValueOnce(true);
            User.save = mockUserSave;

            const spy = spyUserFindOne(null);
            
            const result = await Service.register(fakeUsers);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toMatchObject({ email: fakeUsers['email'] });
            
            expect(result).toBeTruthy();
        });

        it("throw default error", async() => {
            const users = getUsers();
            const spy = spyUserFindOne(users[0]);

            try {
                await register(
                    users[0]
                );
            } catch(e) {                
                expect(e).toBeDefined();
                expect(e.message).toBe('Oops, You already have account with this email!');
                expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);

                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy.mock.calls[0][0]).toBeDefined();
                expect(spy.mock.calls[0][0]).toMatchObject({ email: users[0]['email'] });
                
                expect(spy.mock.calls[0][1]).toBeUndefined();
            }
        });
    });

    describe("users function", () => {
        const { users } = Service;

        it('should be defined', () => {
            expect(users).toBeDefined();
        });

        it("success response", async() => {
            const fakeUsers = getUsers();

            const spy = spyUserFind(fakeUsers);

            const result = await users();
            
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBeDefined();
            expect(spy.mock.calls[0][0]).toMatchObject({});

            expect(result).toMatchObject(fakeUsers);
        });
    });

    describe("generateAuthToken function", () => {
        const { generateAuthToken } = Service;

        it("should be defined", () => {
            expect(generateAuthToken).toBeDefined();
        });

        it("success response", async() => {
            const fakeUsers = getUsers();
            const spyUser = spyUserFindOne(fakeUsers[0]);

            const fakeVal = true;
            const mockBcryptCompare = jest.fn(() => ({ 
                compare: jest.fn(() => fakeVal)
            }));
        
            const mockBcrypt = jest.spyOn(bcrypt, 'compare')
                .mockImplementation(mockBcryptCompare);

            const fakeToken = "fake-token";
            const spyGenerateToken = spyEncodingToken(fakeToken);

            const result = await generateAuthToken(fakeUsers[0]['email'], fakeUsers[0]['password']);

            expect(spyUser).toHaveBeenCalledTimes(1);
            expect(spyUser.mock.calls[0][0]).toMatchObject({ email: fakeUsers[0]['email'] });

            expect(mockBcrypt).toHaveBeenCalledTimes(1); 

            expect(mockBcryptCompare).toHaveBeenCalledTimes(1);
            expect(mockBcryptCompare.mock.calls[0][0]).toBe(fakeUsers[0]['password']);
            expect(mockBcryptCompare.mock.calls[0][1]).toBe(fakeUsers[0]['password']);

            expect(spyGenerateToken).toHaveBeenCalledTimes(1);
            expect(spyGenerateToken.mock.calls[0][0]).toBe(fakeUsers[0]['email']);
            expect(spyGenerateToken.mock.calls[0][1]).toBe(fakeUsers[0]['roles']);

            expect(result).toBe(fakeToken);
        });

        it("throw default error if wrong email", async() => {
            const fakeUsers = getUsers();
            const spyUser = spyUserFindOne(null);

            const fakeVal = false;
            const mockBcrypt = spyBcryptCompare(fakeVal);

            try {
                await generateAuthToken(fakeUsers[0]['email'], fakeUsers[0]['password']);
            } catch(e) {      
                expect(e).toBeDefined();
                expect(e.message).toBe('Oops, wrong email. please kindly check again.');
                expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);

                expect(spyUser).toHaveBeenCalledTimes(1);
                expect(spyUser.mock.calls[0][0]).toBeDefined();
                expect(spyUser.mock.calls[0][0]).toMatchObject({ email: fakeUsers[0]['email'] });
                expect(spyUser.mock.calls[0][1]).toBeUndefined();

                expect(mockBcrypt).toHaveBeenCalledTimes(0);
            }
        });

        it("throw default error if wrong password", async() => {
            const fakeUsers = getUsers();
            const spyUser = spyUserFindOne(fakeUsers[0]['email']);

            const fakeVal = false;
            const mockBcrypt = spyBcryptCompare(fakeVal);

            try {
                await generateAuthToken(fakeUsers[0]['email'], fakeUsers[0]['password']);
            } catch(e) {                                
                expect(e).toBeDefined();
                expect(e.message).toBe('Oops, wrong password. please kindly check again.');
                expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);

                expect(spyUser).toHaveBeenCalledTimes(1);
                expect(spyUser.mock.calls[0][0]).toBeDefined();
                expect(spyUser.mock.calls[0][0]).toMatchObject({ email: fakeUsers[0]['email'] });
                expect(spyUser.mock.calls[0][1]).toBeUndefined();

                expect(mockBcrypt).toHaveBeenCalledTimes(1);
            }
        });
    });

    describe("update function", () => {
        const { update } = Service;

        it("should be defined", async() => {
            expect(update).toBeDefined();
        });

        
    });
 });

const spyUserFindOne = (result, isResolve = true) => (isResolve 
    ? jest.spyOn(User, 'findOne').mockResolvedValue(result)
    : jest.spyOn(User, 'findOne').mockRejectedValue(result));

const spyUserFind = (result, isResolve = true) => (isResolve 
    ? jest.spyOn(User, 'find').mockResolvedValue(result)
    : jest.spyOn(User, 'find').mockRejectedValue(result));

const spyEncodingToken = (result, isResolve = true) => (isResolve
    ? jest.spyOn(Auth, 'encodingToken').mockResolvedValue(result)
    : jest.spyOn(Auth, 'encodingToken').mockRejectedValue(result));

const spyBcryptCompare = (result, isResolve = true) => (isResolve
    ? jest.spyOn(bcrypt, 'compare').mockResolvedValue(result)
    : jest.spyOn(bcrypt, 'compare').mockRejectedValue(result));

const getUsers = () => [{
    username: 'fakeUsername',
    email: 'fake@mail.com',
    password: 'fakePassword',
    roles: [ ROLE['USR']['code']],
    fullame: "fakeUser",
    phoneNumber: "085712345678",
    address: 'fake street, fake number'
}]