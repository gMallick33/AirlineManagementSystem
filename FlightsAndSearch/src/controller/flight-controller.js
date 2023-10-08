const { FlightService } = require('../services/index');

const flightService = new FlightService();

const create = async(req, res) => {
    try {
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        }

        const flight = await flightService.createFlight(flightRequestData);
        return res.status(201).json({
            data: flight,
            success: true,
            message: 'successfully created a flight',
            err: {}
        })
    } catch (error) {
        console.log("something went wrong in controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: 'not able to create a flight',
            err: error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await flightService.getAllFlightData(req.query);
        return res.status(200).json({
            data: response,
            success: true,
            err: {},
            message: "successfully got all the flights"
        })
    } catch (error) {
        console.log("something went wrong at controller layer");
        return res.status(500).json({
            data: {},
            success: false,
            message: 'not able to get all the flights',
            err: error
        })
    }
}

module.exports = {
    create,
    getAll
}