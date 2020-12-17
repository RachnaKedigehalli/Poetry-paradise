const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Poem = require('../models/poem.js');
const Interpretation = require('../models/interpretation.js');

// search based on _id
router.get('/poems/:id', function(request, response, next){
    Poem.findOne({_id: request.params.id}).then(function(poem){
        response.send(poem);
    });
});

// search based on title, verse and poet on the poem
router.post('/poems/search', function(request, response, next){
    // search through body of post request so that characters like new line are read properly

    // finds all poems whose title has the substring request.body.title 
    var titleFind = async function(resArr) {
        if(request.body.title) {
            Poem.find({title: { '$regex' : request.body.title, '$options' : 'i' }}).then(function(poem){
                titleArr = Array.from(poem);
                resArr = resArr.concat(titleArr);
                verseFind(resArr);
            });
        }
        else verseFind(resArr);
    };

    // finds all poems whose verse has the substring request.body.verse
    var verseFind = async function(resArr) {
        if(request.body.verse) {
            Poem.find({verse: { '$regex' : request.body.verse, '$options' : 'i' }}).then(function(poem){
                verseArr = Array.from(poem);
                resArr = resArr.concat(verseArr);
                poetFind(resArr);
            });
        }
        else poetFind(resArr);
    };
    
    // finds all poems whose poet has the substring request.body.poet 
    var poetFind = async function(resArr) {
        if(request.body.poet) {
            Poem.find({poet: { '$regex' : request.body.poet, '$options' : 'i' }}).then(function(poem){
                poetArr = Array.from(poem);
                resArr = resArr.concat(poetArr);

                removeDuplicate(resArr);
            });
        }
        else removeDuplicate(resArr);
    };

    // resArr is concatanation of titleArr, verseArr and poetArr
    // removes duplicates from resArr, if any
    var removeDuplicate = function(resArr) {
        for(var i=0; i<resArr.length; i++) {
            for(var j=i+1; j<resArr.length; j++) {
                var arr = [i,j,String(resArr[i]._id)==String(resArr[j]._id)];
                if(String(resArr[i]._id)==String(resArr[j]._id)) {
                    resArr.splice(j,1);
                    j--;
                }
            }
        }
        response.send(resArr);
    };
    var titleArr = [];
    var verseArr = [];
    var poetArr = [];
    var resArr = [];
    titleFind(resArr);
});


// add poem to db
router.post('/poems', function(request, response, next){
    // create Poem object and saves it to db
    Poem.create(request.body).then(function(poem){      // returns a promise; "poem" is the data saved in db
        response.send(poem);
    }).catch(next);                                     // goes to next middleware(in this case, error handling middleware)
});

// add interpretation to poem db
router.put('/poems/interpretations/:id', function(request, response, next){
    Poem.findOne({_id: request.params.id}).then(function(poem){
        // creates interpretation object based on Schema
        const Itp = mongoose.model('interpretation', Interpretation);
        var itp = new Itp(request.body);
        var newObj = {};
        
        // adds interpretation object to existing array of interpretation objects 
        // and updates poem details
        newObj.interpretations = poem.interpretations.concat(itp);
        Poem.findByIdAndUpdate({_id: request.params.id}, newObj).then(function(){
            Poem.findOne({_id: request.params.id}).then(function(poem){
                response.send(poem);
            });
        });
    });
});

// export router so that it can be used in other files
module.exports = router;
