const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.get('/bookingservice/home', (req, res) => {
        console.log("Hitting Booking Home");
        res.status(201).json({
            message: "hitting booking home"
        });
    });
    app.use('/bookingservice/api', apiRoutes);
    app.listen(PORT, async () => {
        console.log(`server started at: ${PORT}`);
        // if(process.env.DB_SYNC) {
        //     db.sequelize.sync({alter: true});
        // }
    })
}

setupAndStartServer();