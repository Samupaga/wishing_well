const express = require('express'); // Use imported dependency
const cors = require('./cors'); // Use imported dependency


app.use(cors())

app.use(express.json())

const logRoute = require('./logRoute'); // Create middlware to log requests
app.use(logRoute());


const wishes = require('./wishes');


// Set up server roots 
app.get('/', (req, res) => {
    res.send('You have reached the wishing well');
})

