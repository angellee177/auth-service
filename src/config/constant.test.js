const Constant = require("./constant");

describe("Constant Test Suite", () => {
    describe("NODE_ENVIRONMENT attributes", () => {
        it("should match snapshot", () => {
            expect(Constant.NODE_ENVIRONMENT).toBeDefined();
            expect(Constant.NODE_ENVIRONMENT).toMatchSnapshot();
        });
    });
});