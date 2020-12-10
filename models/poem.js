const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create interpretation Schema
const InterpretationSchema = new Schema({
    interpretation: {
        type: String,
        required: [true, 'Interpretation field is required']
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    date: {
        type: Date
    }
});


// create poem Schema and model
const PoemSchema = new Schema({
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
    }
});

// creates collection of poems
const Poem = mongoose.model('poem', PoemSchema);

// export model so that it can be used in other files
module.exports = Poem;
