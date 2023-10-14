const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config/serverConfig');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5
});
console.log(PORT);
app.use(morgan('combined'));
app.use(limiter);
app.use('/bookingservice', createProxyMiddleware({target: 'http://localhost:3002/', changeOrigin: true}));
app.get('/home', (req, res) => {
    return res.json({
        message: 'ok'
    });
});

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});