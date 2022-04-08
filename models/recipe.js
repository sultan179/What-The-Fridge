const mongoose = require("mongoose");                       
const Comment = require('./comment');
const Schema = mongoose.Schema;                     

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
    ratings:{
        type: [Number]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

//Mongoose virtuals
// RecipeSchema.virtual('averageRating').get(function(){
//     var total = 0;
//     for (let rating of this.ratings){
//         total += rating;
//     }
//     return total/this.ratings.length;
// });

module.exports = mongoose.model("Recipe", RecipeSchema);