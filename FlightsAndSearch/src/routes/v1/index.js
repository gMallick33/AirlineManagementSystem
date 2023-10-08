const express = require('express');
const CityController = require('../../controller/city-controller');
const FlightController = require('../../controller/flight-controller');
const AirportController = require('../../controller/airport-controller');
const router = express.Router();

router.post('/city', CityController.create);
router.delete('/city/:id', CityController.destroy);
router.get('/city/:id', CityController.get);
router.patch('/city/:id', CityController.update);
router.get('/city', CityController.getAll);

router.post('/flights', FlightController.create);
router.get('/flights', FlightController.getAll);

router.post('/airports', AirportController.create);

module.exports = router;