const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/poems', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

// serve static files on request
app.use(express.static('public'));

// parse body and attach to request
app.use(bodyParser.json());

// CORS fix
app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    res.header('Access-Control-Allow-Methods', ' GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// initializes routes
app.use('/api', require('./routes/api'));

// error handling
app.use(function(error, request, response, next){
    // console.log(error);
    response.status(422).send({error: error.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Listening for request...');
});
