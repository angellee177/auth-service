const routes = require('./index.route')
    , authController = require('../../controllers/authController')
    , middleware = require('../../middleware/auth');

describe("Users Routes Test Suite", () => {
    it('/ path must refer to the AuthController.users', () => {
        const { route: { path, stack, methods } } = routes.stack[0];

        expect(path).toBe('/');
        expect(methods).toMatchObject({ get: true });

        // The Controller should be the last of stack
        const controller = stack[stack.length - 1].handle;
        expect(controller).toBe(authController.users);
    });
});