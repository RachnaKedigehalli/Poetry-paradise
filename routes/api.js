const express = require('express');
const router = express.Router();
const Poem = require('../models/poem.js');

// get list of poems from db
router.get('/poems', function(request, response, next){
    /*Poem.find({}).then(function(poems){
        response.send(poems);
    });*/
    // 
    // request.query.poet
});

// add poem to db
router.post('/poems', function(request, response, next){
    // var poem = new Poem(request.body);      // create Poem object using data sent in body of request
    // poem.save();        // save to db

    // create Poem object and saves it to db
    Poem.create(request.body).then(function(poem){      // returns a promise; "poem" is the data saved in db
        response.send(poem);
    }).catch(next);     // goes to next middleware(in this case, error handling middleware)
});

// update poem details in db
router.put('/poems/:id', function(request, response, next){
    Poem.findByIdAndUpdate({_id: request.params.id}, request.body).then(function(){
        Poem.findOne({_id: request.params.id}).then(function(poem){
            response.send(poem);
        });
    });
    // response.send({type: 'PUT'});
});

// delete poem from db
router.delete('/poems/:id', function(request, response, next){
    Poem.findByIdAndRemove({_id: request.params.id}).then(function(poem){
        response.send(poem);
    });
    // response.send({type: 'DELETE'});
});

// export router so that it can be used in other files
module.exports = router;
