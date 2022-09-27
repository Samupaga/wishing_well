const express = require('express'); // Use imported dependency
const cors = require('cors'); // Use imported dependency

const wishes = require('./wishes');
const logRoute = require('./route-logger'); // Create middlware to log requests

// Makes a basic server
const app = express();

// Allow requests from other origins
app.use(cors())
// Allow express to read body of a POST request
app.use(express.json())

// Use the logRoute function to add middleware
app.use(logRoute);


// Set up server roots 
app.get('/', (req, res) => {
    res.send('You have reached the wishing well');
})








module.exports = app;
