const routes = require('./index.route')
    , authController = require('../../controllers/authController')
    
describe('Authentication Routes Test Suite', () => {
    it('/login path must refer to the AuthController.login', () => {
        const { route: { path, stack, methods } } = routes.stack[0];

        expect(path).toBe('/login');
        expect(methods).toMatchObject({ post: true });

        // The Controller should be the last of stack
        const controller = stack[stack.length - 1].handle;
        expect(controller).toBe(authController.login);
    });

    it('/generate-token path must refer to the AuthController.login', () => {
        const { route: { path, stack, methods } } = routes.stack[1];

        expect(path).toBe('/generate-token');
        expect(methods).toMatchObject({ post: true });

        // The Controller should be the last of stack
        const controller = stack[stack.length - 1].handle;
        expect(controller).toBe(authController.generateAuthToken);
    });

    it('/register path must refer to the AuthController.login', () => {
        const { route: { path, stack, methods } } = routes.stack[2];

        expect(path).toBe('/register');
        expect(methods).toMatchObject({ post: true });

        // The Controller should be the last of stack
        const controller = stack[stack.length - 1].handle;
        expect(controller).toBe(authController.register);
    });
});
