const { CityService } = require('../services/index');

const cityService = new CityService();

const create = async (req, res) => {
    try {
        const city = await cityService.createCity(req.body);
        return res.status(201).json({
            data: city,
            success: true,
            message: "successfully created a city",
            error: {}
        })
        
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to create a city",
            error: error
        })
    }
}

const destroy = async (req, res) => {
    try {
        const response = await cityService.deleteCity(req.body);
        return res.status(200).json({
            data: city,
            success: true,
            message: "successfully removed a city",
            error: {}
        })
        
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to remove a city",
            error: error
        })
    }
}

const update = async (req, res) => {
    try {
        const city = await cityService.updateCity(req.params.id, req.body);
        return res.status(201).json({
            data: city,
            success: true,
            message: "successfully updated a city",
            error: {}
        })
        
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to update a city",
            error: error
        })
    }
}

const get = async (req, res) => {
    try {
        const city = await cityService.getCity(req.params.id);
        return res.status(201).json({
            data: city,
            success: true,
            message: "successfully got a city",
            error: {}
        })
        
    } catch (error) {
        console.log("something went wrong in the controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: "not able to get a city",
            error: error
        })
    }
}

module.exports = {
    create,
    destroy,
    get,
    update
}