const express = require('express');
const requestIp = require('request-ip');
const app = express();
const axios = require('axios');
const request = require('request');
const IP = require('ip');
const API_KEY = '2ccd1bd324bd42e4ae230af59c37ad96';
const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY;

const port = 3000;

app.use(requestIp.mw());

app.get('/', (req, res) => {
    res.redirect('/home')
});

const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
    return apiResponse.data;
}

app.get('/home', async (req, res) => {
    const ipAddress = IP.address();
    const ipAddressInformation = await sendAPIRequest(ipAddress);
    console.log(ipAddressInformation, ipAddress)
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