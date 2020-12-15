const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Poem = require('../models/poem.js');
const Interpretation = require('../models/interpretation.js');

function inArray(poem, poems) {
    for(var i=0; i<poems.length; i++) {
        if(poem._id == poems[i]._id) return true;
    }
    return false;
}

router.get('/poems', function(request, response, next){
    console.log(request.query.title + '-'+request.query.verse + '-' + request.query.poet);
    console.log(request.query.verse=='');
    // console.log(request.query.poet);

    // Poem.find({$or: [{title: { '$regex' : request.query.title, '$options' : 'i' }}, {verse: { '$regex' : request.query.verse, '$options' : 'i' }}, {poet: { '$regex' : request.query.poet, '$options' : 'i' }}]}).then(function(poem){
    //     response.send(poem);
    // });
    Poem.find({$or: [{$and: [{title: { '$regex' : request.query.title, '$options' : 'i' }},{title: {$not: { '$regex': "" }}}]},
                {$and: [{verse: { '$regex' : request.query.verse, '$options' : 'i' }},{verse: {$not: { '$regex': "" }}}]},
                {$and: [{poet: { '$regex' : request.query.poet, '$options' : 'i' }},{poet: {$not: { '$regex': "" }}}]}]}).then(function(poem){
        response.send(poem);
    });
});


// get list of poems from db
router.get('/poem', function(request, response, next){
    /*Poem.find({}).then(function(poems){
        response.send(poems);
    });*/
    // 
    // request.query.poet
    var poems=[];

    if(request.query.title) {
        Poem.find({title: { '$regex' : request.query.title, '$options' : 'i' }}).then(function(poem){
            console.log("\ntitle");
            console.log(poem);
            // poem.forEach(function(p){
            //     console.log(p);
            //     console.log(!p in poems);
            //     if(poems.indexOf(p)==-1) {
            //         poems = poems.concat(poem);
            //         console.log(poems);
            //     }
            // });
            if(!inArray(poem, poems)) poems = poems.concat(poem);
            console.log(poems);
        });
    }
    
    if(request.query.verse) {
        Poem.find({verse: { '$regex' : request.query.verse, '$options' : 'i' }}).then(function(poem){
            console.log("\nverse");
            console.log(poem);
            // poem.forEach(function(p){
            //     console.log(p);
            //     console.log(!p in poems);
            //     if(poems.indexOf(p)==-1) {
            //         poems = poems.concat(poem);
            //         console.log(poems);
            //     }
            // });
            if(!inArray(poem, poems)) poems = poems.concat(poem);
            console.log(poems);
        });
    }
    
    if(request.query.poet) {
        Poem.find({poet: { '$regex' : request.query.poet, '$options' : 'i' }}).then(function(poem){
            console.log("\npoet");
            console.log(poem);
            // poem.forEach(function(p){
            //     console.log(p);
            //     console.log(!p in poems);
            //     if(poems.indexOf(p)==-1) {
            //         poems = poems.concat(poem);
            //         console.log(poems);
            //     }
            // });
            if(!inArray(poem, poems)) poems = poems.concat(poem);
            console.log(poems);

            console.log("\n\nPoems---");
            console.log(poems);
            console.log("sending");
            response.send(poems);
            console.log("sent");
        });
    }
    // console.log("Poems---");
    // console.log(poems);
    // console.log("sending");
    // response.send(poems);
    // console.log("sent");
});

// search based on _id
router.get('/poems/:id', function(request, response, next){
    Poem.findOne({_id: request.params.id}).then(function(poem){
        response.send(poem);
    });
});

//-------------------------------------------------
// substring search given name of poet
router.get('/poems/:title/:verse/:poet_name', function(request, response, next){
    console.log("reg test");
    console.log(request.url);
    console.log(request.params.poet_name);
    console.log(request.params.title);
    Poem.find({poet: { '$regex' : request.params.poet_name, '$options' : 'i' }}).then(function(poem){
        console.log(poem);
        response.send(poem);
    });
});

router.get('/poems/title/:title', function(request, response, next){
    console.log(request.params.title);
    Poem.find({title: { '$regex' : request.params.title, '$options' : 'i' }}).then(function(poem){
        console.log("Title---------");
        console.log(poem);
        response.send(poem);
    });
});
router.get('/poems/poet/:poet_name', function(request, response, next){
    console.log(request.params.poet_name);
    Poem.find({poet: { '$regex' : request.params.poet_name, '$options' : 'i' }}).then(function(poem){
        console.log("Poet---------");
        console.log(poem);
        response.send(poem);
    });
});
router.get('/poems/verse/:verse', function(request, response, next){
    console.log(request.params.verse);
    Poem.find({verse: { '$regex' : request.params.verse, '$options' : 'i' }}).then(function(poem){
        console.log("Verse---------");
        console.log(poem);
        response.send(poem);
    });
});
//-------------------------------------------------

// add poem to db
router.post('/poems', function(request, response, next){
    // var poem = new Poem(request.body);      // create Poem object using data sent in body of request
    // poem.save();        // save to db

    // create Poem object and saves it to db
    Poem.create(request.body).then(function(poem){      // returns a promise; "poem" is the data saved in db
        // console.log(poem);
        response.send(poem);
    }).catch(next);     // goes to next middleware(in this case, error handling middleware)
});

// add interpretation to poem db
router.put('/poems/interpretations/:id', function(request, response, next){
    Poem.findOne({_id: request.params.id}).then(function(poem){
        const Itp = mongoose.model('interpretation', Interpretation);
        // console.log("Request body\n" + request.body);
        var itp = new Itp(request.body);
        // console.log("\nitp object \n"+ itp);
        var newObj = {};
        newObj.interpretations = poem.interpretations.concat(itp);
        // console.log("\nPoem\n"+poem);
        Poem.findByIdAndUpdate({_id: request.params.id}, newObj).then(function(){
            Poem.findOne({_id: request.params.id}).then(function(poem){
                console.log("\nPoem\n"+poem);
                response.send(poem);
            });
        });
    });
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
