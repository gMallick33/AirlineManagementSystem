const express = require('express');
const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async () =>{
    const app = express();
    app.listen(() => {
        console.log(`server started on: ${PORT}`);
        // console.log(process.env.PORT);
    })
}

setupAndStartServer();