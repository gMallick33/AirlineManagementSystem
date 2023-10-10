const express = require('express');
const CityController = require('../../controller/city-controller');
const FlightController = require('../../controller/flight-controller');
const AirportController = require('../../controller/airport-controller');
const { FlightMiddlewares } = require('../../middlewares/index');
const router = express.Router();

router.post('/city', CityController.create);
router.delete('/city/:id', CityController.destroy);
router.get('/city/:id', CityController.get);
router.patch('/city/:id', CityController.update);
router.get('/city', CityController.getAll);

router.post(
    '/flights', 
    FlightMiddlewares.validateCreateFlight, 
    FlightController.create
    );
router.get('/flights/:id', FlightController.get);
router.get('/flights', FlightController.getAll);
router.patch('/flights/:id', FlightController.update);

router.post('/airports', AirportController.create);

module.exports = router;