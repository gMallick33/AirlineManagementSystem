const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async () =>{
    const app = express();
    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded{express: true});
    app.listen(() => {
        console.log(`server started on: ${PORT}`);
        // console.log(process.env.PORT);
    })
}

setupAndStartServer();