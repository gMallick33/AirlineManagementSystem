const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config/serverConfig');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5
});
console.log(PORT);
app.use(morgan('combined'));
app.use(limiter);
app.use('/bookingservice', async (req, res, next) => {
    console.log(req.headers['x-access-token']);
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated', {
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        console.log(response.data);
        if(response.data.success) {
            next();
        }
        else {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
})
app.use('/bookingservice', createProxyMiddleware({target: 'http://localhost:3002/', changeOrigin: true}));
app.get('/home', (req, res) => {
    return res.json({
        message: 'ok'
    });
});

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});