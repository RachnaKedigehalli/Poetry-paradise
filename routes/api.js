const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Poem = require('../models/poem.js');
const Interpretation = require('../models/interpretation.js');


router.post('/poems/search', function(request, response, next){
    
    var titleFind = async function(resArr) {
        if(request.body.title) {
            console.log("test");
            Poem.find({title: { '$regex' : request.body.title, '$options' : 'i' }}).then(function(poem){
                titleArr = Array.from(poem);
                // console.log("\nTitle:\n");
                // console.log(titleArr);
                resArr = resArr.concat(titleArr);
                verseFind(resArr);
            });
        }
        else verseFind(resArr);
        // return resArr;
    };
    var verseFind = async function(resArr) {
        if(request.body.verse) {
            Poem.find({verse: { '$regex' : request.body.verse, '$options' : 'i' }}).then(function(poem){
                verseArr = Array.from(poem);
                // console.log("\nverse:\n");
                // console.log(verseArr);
                resArr = resArr.concat(verseArr);
                poetFind(resArr);
            });
        }
        else poetFind(resArr);
        // return resArr;
    };
    var poetFind = async function(resArr) {
        if(request.body.poet) {
            Poem.find({poet: { '$regex' : request.body.poet, '$options' : 'i' }}).then(function(poem){
                poetArr = Array.from(poem);
                // console.log("\nPoet:\n");
                // console.log(poetArr);
                resArr = resArr.concat(poetArr);

                removeDuplicate(resArr);
            });
        }
        else removeDuplicate(resArr);
        // return resArr;
    };

    var removeDuplicate = function(resArr) {
        // console.log("\nTitle:\n");
        //     console.log(titleArr);
        //     console.log("\nverse:\n");
        //     console.log(verseArr);
        //     console.log("\nPoet:\n");
        //     console.log(poetArr);
        for(var i=0; i<resArr.length; i++) {
            for(var j=i+1; j<resArr.length; j++) {
                var arr = [i,j,String(resArr[i]._id)==String(resArr[j]._id)];
                console.log(arr);
                if(String(resArr[i]._id)==String(resArr[j]._id)) {
                    resArr.splice(j,1);
                    j--;
                }
            }
        }
        // console.log(resArr+"---------------------------------------------------------------");
        response.send(resArr);
    };
    var titleArr = [];
    var verseArr = [];
    var poetArr = [];
    var resArr = [];
    titleFind(resArr);
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
