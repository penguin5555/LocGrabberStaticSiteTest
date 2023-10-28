const express = require('express');
const requestIp = require('request-ip');
const app = express();

const port = 3000;

app.use(requestIp.mw());

// app.set('trust proxy', true)
app.get('/', (req, res) => {
    res.redirect('/home')
});

app.get('/home', async (req, res) => {
    // console.log(req.userIp)
    foundClientIp = req.clientIp
    if (foundClientIp !== '216.144.248.27') {
        console.log(foundClientIp)  // only works when being hosted on server
    }
    res.sendFile(__dirname + '/home.html')
});

app.listen(port, () => {
    console.log("Server running!")
});