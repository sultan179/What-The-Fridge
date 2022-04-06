//Comments route
const express = require('express');
const router = express.Router({mergeParams:true});

//Models
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

//Our Own Error Handling 
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const {isLoggedIn, isCommentAuthor, validateComment} = require('../middleware');

//Add new Comments
// POST /recipes/:id/comments
router.post('/', isLoggedIn, validateComment, catchAsync(async(req,res) => {
    const recipe = await Recipe.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    recipe.comments.push(comment);
    await comment.save();
    await recipe.save();
    req.flash('success', 'Sucessfully made comment');
    res.redirect(`/recipes/${recipe._id}`);
}));

//Comment delete
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(async(req,res) => {
    const {id, commentId} = req.params;
    await Recipe.findByIdAndUpdate(id, {$pull: {commnets: commentId}});
    await Comment.findByIdAndDelete(req.params.commentId);
    req.flash('success', 'Sucessfully deleted comment');
    res.redirect(`/recipes/${id}`);
}));

module.exports = router;