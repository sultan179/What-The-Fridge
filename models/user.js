//User Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
//   username: {
//     type: String,
//     required: [true, "must provide a name"],
//     trim: true,
//     maxlength: [20, "name cant be more than 20 char"],
//   },
//   password: { 
//     type: String,
//     required: [true, "must provide a password"],
//     trim: true,
//     maxlength: [20, "password can't more than 20 chars"], },
});

//This code adds username and passwords and additional useful methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
