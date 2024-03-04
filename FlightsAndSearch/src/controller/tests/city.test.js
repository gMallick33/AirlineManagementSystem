const request = require("supertest");
const { CityService } = require("../../services/index");
const CityController = require("../city-controller");
const app = require("../../index");
// const app = setupAndStartServer();
jest.mock("../../services/index");

CityService.prototype.createCity = jest.fn();

describe("city Controller", () => {
  beforeEach(() => {
    // Clear the mock implementation for createCity before each test
    CityService.prototype.createCity.mockClear();
  });
  afterEach(async () => {
    // Optionally, you can perform cleanup tasks here
    // For example, resetting other mocks or clearing resources
    // Close your Express app after each test
    // app.close();
    // await new Promise((resolve) => app.close(resolve));
  });
  it("should handle city creation", async () => {
    // const app = await setupAndStartServer();
    CityService.prototype.createCity.mockResolvedValue({
      id: 1,
      names: "test city",
    });

    const response = await request(app)
      .post("/api/v1/city")
      .send({ names: "test city" });

    expect(response.status).toBe(201);
  });
});
