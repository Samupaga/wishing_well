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
});

// Show all wishes
app.get('/wishes', (req, res) => {
    res.send(wishes)
});

// Show wishes based on descending vote count
app.get('/wishes/popular', (req, res) => {
    const sortedWishes = wishes.sort((a, b) => b.votes - a.votes);

    res.send(sortedWishes);
})


// Allow users to add a wish to the well 
app.post('/wishes', (req, res) => {
    
    // extract wish data
    const data = req.body

    // add an id to the wish
    data['id'] = wishes.length 

    // set a starting number of votes
    data['votes'] = 0
    
    // add wish to the wishing well
    wishes.push(data)

    // successful additon
    res.status(201).send(data)
})



module.exports = app;
