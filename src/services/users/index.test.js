const User = require('../../database/models/users');
const Service = require('./index');

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

        it("success response", async() => {

        });
    });
 });