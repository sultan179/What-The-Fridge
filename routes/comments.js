//Comments route
const express = require('express');
const router = express.Router({mergeParams:true});

//Models
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

//Our Own Error Handling 
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

//Comment data Validation
const {commentSchema} = require('../schemas');
const validateComment = (req, res, next) => {
    const {error} = commentSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

//Add new Comments
// POST /recipes/:id/comments
router.post('/', validateComment,catchAsync(async(req,res) => {
    const recipe = await Recipe.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    recipe.comments.push(comment);
    await comment.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
}));

//Comment delete
router.delete('/:commentId', catchAsync(async(req,res) => {
    const {id, commentId} = req.params;
    await Recipe.findByIdAndUpdate(id, {$pull: {commnets: commentId}});
    await Comment.findByIdAndDelete(req.params.commentId);
    res.redirect(`/recipes/${id}`);
}));

module.exports = router;