const mongoose = require('mongoose');
const Schema = mongoose.Schema;                                     // for less coding

//API is not considered*** it's just a dummy model........
const commentSchema = new Schema({
    text: String,
    rating: Number
});

module.exports = mongoose.model("Comment", commentSchema);