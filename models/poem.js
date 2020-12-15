const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InterpretationSchema = require('./interpretation.js');

// create poem Schema and model
const PoemSchema = new Schema({
    title: {
        type: String,
        default: "Unknown"
    },
    verse: {
        type: String,
        required: [true, 'Verse field is required']
    },
    poet: {
        type: String,
        default: "Unknown"
    },
    interpretations: {
        type: [InterpretationSchema]
    },
    datePosted: {
        type: Date
    },
    postedBy: {
        type: String
    }
});

// creates collection of poems
const Poem = mongoose.model('poem', PoemSchema);

// export model so that it can be used in other files
module.exports = Poem;
