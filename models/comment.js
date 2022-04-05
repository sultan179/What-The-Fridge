const mongoose = require('mongoose');
const Schema = mongoose.Schema;                                   

const commentSchema = new Schema({
    text: String,
    rating: Number
});

module.exports = mongoose.model("Comment", commentSchema);