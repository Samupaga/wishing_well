const app = require('./app');

const port = 3000;

app.listen(port, () => {
    console.log(`The wishing well is listening to requests on port ${port}`)
})
