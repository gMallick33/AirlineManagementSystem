const { City } = require('../models/index');
const { Op } = require('sequelize')

class CityRepository{
    async createCity({ names }){
        try {
            const city = await City.create({ names });
            return city;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error};
        }
    }

    async deleteCity(cityId){
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error};
        }
    }

    async updateCity(cityId, data){
        try {
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     }
            // })
            const city = await City.findByPk(cityId);
            city.names = data.names;
            await city.save();
            return city;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

    async getCity(cityId){
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw {error};
        }
    }

    async getAll(filter){
        try {
            if(filter.names){
                const cities = await City.findAll({
                    where:{
                        names: {
                            [Op.startsWith]: filter.names
                        }
                    }
                })
                return cities;
            }
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = CityRepository;