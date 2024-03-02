const { CityRepository } = require("../../repository/index");
const CityService = require("../city-service");

jest.mock("../../repository/index", () => ({
  CityRepository: jest.fn(() => ({
    createCity: jest.fn(),
    deleteCity: jest.fn(),
    updateCity: jest.fn(),
    getCity: jest.fn(),
    getAll: jest.fn(),
  })),
}));

describe("CityService", () => {
  let cityService;

  beforeEach(() => {
    jest.clearAllMocks();
    cityService = new CityService();
  });

  describe("createCity", () => {
    it("should create a city successfully", async () => {
      cityService.cityRepository.createCity.mockResolvedValue({
        name: "Test City",
      });
      const result = await cityService.createCity({ name: "Test City" });

      expect(result).toEqual({ name: "Test City" });
      expect(cityService.cityRepository.createCity).toHaveBeenCalledWith({
        name: "Test City",
      });
    });
  });

  describe("deleteCity", () => {
    it("should delete a city successfully", async () => {
      cityService.cityRepository.deleteCity.mockResolvedValue({
        success: true,
      });
      const result = await cityService.deleteCity(1);

      expect(result).toEqual({ success: true });
      expect(cityService.cityRepository.deleteCity).toHaveBeenCalledWith(1);
    });
  });

  // Repeat the above structure for other functions (updateCity, getCity, getAll)
  // ...

  describe("getAll", () => {
    it("should get all cities successfully", async () => {
      cityService.cityRepository.getAll.mockResolvedValue([
        { name: "City1" },
        { name: "City2" },
      ]);
      const result = await cityService.getAll({});

      expect(result).toEqual([{ name: "City1" }, { name: "City2" }]);
      expect(cityService.cityRepository.getAll).toHaveBeenCalledWith({});
    });
  });
});
