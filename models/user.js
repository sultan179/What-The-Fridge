//User Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    ownRecipes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    savedRecipes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
});

//This code adds username and passwords and additional useful methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);