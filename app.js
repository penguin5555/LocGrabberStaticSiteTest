const express = require('express');
const requestIp = require('request-ip');
const app = express();
const axios = require('axios');
const request = require('request');

const port = 3000;

app.use(requestIp.mw());

app.get('/', (req, res) => {
    res.redirect('/home')
});

app.get('/home', async (req, res) => {
    
    
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const clientIP = response.data.ip;
        console.log(clientIP);
        res.json({ clientIP });
    } catch (error) {
        console.error('Failed to fetch client IP address:', error);
        res.status(500).json({ error: 'Failed to fetch IP address' });
        }
    });

app.listen(port, () => {
    console.log("Server running!")
});