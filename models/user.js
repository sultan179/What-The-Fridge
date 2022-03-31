const mongoose = require("mongoose");
//dummmy user model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cant be more than 20 char"],
  },
  password: { 
    type: String,
    required: [true, "must provide a password"],
    trim: true,
    maxlength: [20, "password can't more than 20 chars"], },
});

module.exports = mongoose.model("User", UserSchema);
