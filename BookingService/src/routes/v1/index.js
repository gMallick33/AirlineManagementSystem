const express = require('express');

const router = express.Router();
const { BookingController } = require('../../controllers/index');
// const { createChannel } = require('../../utils/messageQueue');
// const channel = createChannel();
const bookingController = new BookingController( );
router.post('/booking', bookingController.create);
router.post('/publish', bookingController.sendMessageToQueue);
router.get('/info', (req, res) => {
    return res.json({
        message: 'getting info on booking service'
    })
})
module.exports = router;