const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');
const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, async () => {
        console.log(`server started on: ${PORT}`);
        // sendBasicEmail(
        //     'support@admin.com',
        //     'gyani1@yopmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like our support'
        // );
    });
}

setupAndStartServer()