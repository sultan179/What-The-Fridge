const mongoose = require("mongoose");

//API is not considered*** it's just a dummy model........
const RecipeSchema = new mongoose.Schema({

  id: {
    type: String,
    required:true   
  },
  name: {
    type: String,
    required: [true, "must provide a name of recipe"],
    trim: true,
    maxlength: [20, "name cant be more than 20 char"],
  },
   img:
    {
        data: Buffer,
        contentType: String
    },
  ingredients: { 
    type: String,
    required: [true, "must provide a name"],
    trim: true,
     },

   steps: {
    type: String,
    required: [true, "must provide the steps to make the meal"],
    trim: true,

  },
   
});

module.exports = mongoose.model("Recipe", RecipeSchema);
