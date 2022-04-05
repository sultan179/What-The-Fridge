const mongoose = require("mongoose");                               // get mongoose
const Comment = require('./comment');
const Schema = mongoose.Schema;                                     // for less coding

//API is not considered*** it's just a dummy model........
const RecipeSchema = new Schema({

    name: {
        type: String,
        required: [true, "must provide a name of recipe"],
        trim: true,
        maxlength: [20, "name cant be more than 20 char"],
    },
    image:{
        type: String,
    },
    ingredients:{
        type: [String]
    },
    directions: {
        type: [String]
    },
    descriptions:{
        type: String
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//Mongo middleware 
//We need to delete all the comments when deleting the associated recipe
RecipeSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
                $in: doc.comments
            }
        })
    }
});

module.exports = mongoose.model("Recipe", RecipeSchema);