//Recipe route
const express = require('express');
const router = express.Router();

//Models
const Recipe = require('../models/recipe');

//auth middleware
const {isLoggedIn, isAuthor, validateRecipe} = require('../middleware');

//Our Own Error Handling 
const catchAsync = require('../utils/catchAsync');

// Show all Recipes - This will be the results page when searching with ingredients
router.get('/',catchAsync( async (req, res) => {
    // const ingredients=req.query.ingredient.replace(","," ")
    const ingredients = req.query.ingredients;
    console.log("ingredients",ingredients)
    const recipes = await Recipe.find(
            { $text: { $search: ingredients} },
            { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } }).limit(10);
    console.log("recipes",recipes,ingredients)
    // req.flash('success', 'Sucessfully found recipe');
    res.render('recipes/index', {recipes,ingredients});
}));

//Shows the Add New Recipe Page
router.get('/new', isLoggedIn, (req, res) => {
    res.render('recipes/new');
});

//Adds New Recipe
router.post('/', isLoggedIn, validateRecipe, catchAsync(async(req, res, next) =>{
    const recipe = new Recipe(req.body.recipe);
    recipe.author = req.user._id;
    req.user.recipes.push(recipe);
    await recipe.save();
    await req.user.save();
    req.flash('success', 'Sucessfully made recipe');
    res.redirect(`/recipes/${recipe._id}`); 
}));

// Show individual recipe - This will be the view recipe page
router.get('/:id', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!recipe){
        console.log("recipe not found");
        req.flash('error', 'Recipe does not exist with the specified id');
        return res.redirect('/recipes');
    }
    res.render('recipes/show', {recipe});
}));

//Show Edit Recipes page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req, res) =>{
    const recipe = await Recipe.findById(req.params.id);
    if(!recipe){
        req.flash('error', 'Could not find the recipe');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', {recipe});
}));

//Edits the recipe
router.put('/:id', isLoggedIn, isAuthor, validateRecipe, catchAsync(async(req, res) =>{
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
    req.flash('success', 'Sucessfully updated recipe');
    res.redirect(`/recipes/${recipe._id}`);
}));

//Deletes Recipe
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req,res)=>{
    const {id} = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Sucessfully deleted recipe');
    res.redirect('/recipes');
}));

module.exports = router;