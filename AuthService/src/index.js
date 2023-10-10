const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const { User, Role } = require('./models/index');
const app = express();

const prepareAnndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);
    app.listen(PORT, async () => {
        console.log(`server started at: ${PORT}`);
        // if(process.env.SYNC_DB){
        //     db.sequelize.sync({alter: true});
        // }
    });
}

prepareAnndStartServer();