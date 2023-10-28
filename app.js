const express = require('express');
const requestIp = require('request-ip');
const app = express();
const request = require('request');

const port = 3000;

app.use(requestIp.mw());

app.get('/', (req, res) => {
    res.redirect('/home')
});

app.get('/home', (req, res) => {
    console.log(req.clientIp)
    res.sendFile(__dirname + '/home.html');
    
    const ipAddressService = 'https://ifconfig.me/ip';

    request(ipAddressService, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const publicIP = body.trim();
        console.log('Gottem')
        console.log('Your public IP address is:', publicIP);
        
        
      } else {
        console.error('Failed to fetch public IP address:', error);
      }
    });

});

app.listen(port, () => {
    console.log("Server running!")
});