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

// creates collection of poems
// const Interpretation = mongoose.model('interpretation', InterpretationSchema);

// export model so that it can be used in other files
module.exports = InterpretationSchema;