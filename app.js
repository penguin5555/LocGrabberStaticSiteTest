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

app.use(async (req, res, next) => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      const userIp = response.data.ip;
      req.userIp = userIp;
      next();
    } catch (error) {
      next(error);
    }
});
// app.set('trust proxy', true)
app.get('/', (req, res) => {
    res.redirect('/home')
});

const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
    return apiResponse.data;
}

app.get('/home', async (req, res) => {
    // console.log(req.userIp)
    console.log(req.clientIp)  // only works when being hosted on server
    res.sendFile(__dirname + '/home.html')
});

app.listen(port, () => {
    console.log("Server running!")
});