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
    const newWish = req.body

    // add an id to the wish
    newWish['id'] = wishes.length 

    // set a starting number of votes
    newWish['votes'] = 0
    
    // add wish to the wishing well
    wishes.push(newWish)

    // successful additon
    res.status(201).send(newWish)
})


// Select a wish from its id
app.get('/wishes/:id', (req, res) => {

    try {
        // Need link form URL
        const id = parseInt(req.params.id)
        
        if (isNaN(id)){
            throw "Invalid input!"
        } else if ( id < 0|| id >= wishes.length){
            throw "No such wish exists"
        }
        // If no such issues, continue
        
        // Filter wishes for relevant id
        const filteredWishes = wishes.filter(w => w.id == req.params.id)
    
        // Display specific wish
        res.send(filteredWishes[0])
    } catch (e){
        // Send an error message if unsuccessful
        res.status(404).send({error: e})
    }
    
})

// Delete a wish based on its id
app.delete('/wishes/:id', (req, res) => {

    const id = parseInt(req.params.id)

    // Want to exlucde wish with id to be deleted
    wishes = wishes.filter(w => w.id != id);

    // Report success
    res.send({message: 'Wish removed successfully'})
})




module.exports = app;
