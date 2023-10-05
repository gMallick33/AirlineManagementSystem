const { City } = require('../models/index');

class CityRepository{
    async createCity({ name }){
        try {
            const city = City.create({ name });
            return city;
        } catch (error) {
            throw {error};
        }
    }

    async deleteCity(cityId){
        try {
            City.destroy({
                where: {
                    id: cityId
                }
            });
        } catch (error) {
            throw {error};
        }
    }
}