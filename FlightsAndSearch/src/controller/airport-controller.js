const { AirportService } = require('../services/index');
const airportService = new AirportService();
const create = async (req, res) => {
    try {
        console.log(req.body);
        const response = await airportService.create(req.body);
        
        return res.status(201).json({
            data: response,
            successful: true,
            message: 'successfully created airport',
            err: {}
        })
    } catch (error) {
        console.log('something went wrong at airport service layer');
        return res.status(500).json({
            data: {},
            success: false,
            message: 'cannot create a new airport',
            err: error
        })
    }
}

module.exports = {
    create
}