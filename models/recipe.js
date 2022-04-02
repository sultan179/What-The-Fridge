const mongoose = require("mongoose");                               // get mongoose
const Schema = mongoose.Schema;                                     // for less coding

//API is not considered*** it's just a dummy model........
const RecipeSchema = new Schema({

//   id: {
//     type: String,
//     required:true   
//   },
  name: {
    type: String,
    required: [true, "must provide a name of recipe"],
    trim: true,
    maxlength: [20, "name cant be more than 20 char"],
  },
   
   
});

module.exports = mongoose.model("Recipe", RecipeSchema);