const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const app = express();

const prepareAnndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`server started at: ${PORT}`);
    });
}

prepareAnndStartServer();