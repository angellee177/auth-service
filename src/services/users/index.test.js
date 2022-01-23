const User = require('../../database/models/users');
const Service = require('./index');
const { StatusCodes } = require('http-status-codes'); 

 jest.mock('../../database/models/users');

 describe("Users Services Test Suite", () => {
    beforeEach(() => { 
        User.mockClear();
    });

    describe("register function", () => {
        const { register } = Service;

        it("should be defined", () => {
            expect(register).toBeDefined();
        });

        // it("success response", async() => {
        //     const user = fakeUser[0];
        //     const spy = spyUserFindOne(null);

        //     const mockUserSave = jest.fn();
        //     const 
        // });

        it("throw default error", async() => {
            const user = fakeUsers[0];
            const spy = spyUserFindOne(fakeUsers[0]);

            try {
                await register(user['username'], user['email'], user['password']);
            } catch(e) {                
                expect(e).toBeDefined();
                expect(e.message).toBe('Oops, You already have account with this email!');
                expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);

                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy.mock.calls[0][0]).toBeDefined();
                expect(spy.mock.calls[0][0]).toMatchObject({ email: user['email'] });
                
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
            const spy = spyUserFind(fakeUsers);

            const result = await users();
            
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy.mock.calls[0][0]).toBeDefined();
            expect(spy.mock.calls[0][0]).toMatchObject({});

            expect(result).toMatchObject(fakeUsers);
        });
    });
 });

const spyUserFindOne = (result, isResolve = true) => (isResolve 
    ? jest.spyOn(User, 'findOne').mockResolvedValue(result)
    : jest.spyOn(User, 'findOne').mockRejectedValue(result));

const spyUserFind = (result, isResolve = true) => (isResolve 
    ? jest.spyOn(User, 'find').mockResolvedValue(result)
    : jest.spyOn(User, 'find').mockRejectedValue(result));

const fakeUsers = [{
    username: 'fakeUsername',
    email: 'fake@mail.com',
    password: 'fakePassword',
    role: 1,
    full_name: "fakeUser",
    contact_number: "085712345678",
    address: 'fake street, fake number'
}]