//Recipe route
const express = require('express');
const router = express.Router();

//Models
const Recipe = require('../models/recipe');
const User = require('../models/user');

//auth middleware
const {isLoggedIn, isAuthor, validateRecipe} = require('../middleware');

//Our Own Error Handling 
const catchAsync = require('../utils/catchAsync');


router.get('/', async (req, res,next) => {
   
   res.render('home',{title:'Homepage'});
   next()
});

// Show all Recipes - This will be the results page when searching with ingredients
router.get('/results',catchAsync( async (req, res) => {
    
  if (req.query!==null){

  
    const ingredients = req.query.ingredients;
    // console.log("ingredients",ingredients)
    const recipes = await Recipe.find(
            { $text: { $search: ingredients} },
            { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } }).limit(10);
            return res.render('recipes/index', {recipes,ingredients})
   }
     return res.render('recipes/index', {recipes,ingredients})
}));

//Shows the Add New Recipe Page
router.get('/new', isLoggedIn, (req, res) => {
    res.render('recipes/new');
});

//Adds New Recipe
router.post('/', isLoggedIn,catchAsync(async(req, res, next) =>{
    const recipe = new Recipe(req.body.recipe);
    recipe.author = req.user._id;
    req.user.ownRecipes.push(recipe);
    console.log("directions",recipe.directions)
    
    // req.user.recipes.push(recipe);
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

//Route for sending rating to recipe
router.post('/:id', catchAsync(async(req, res) => {
    const {rating} = req.body.recipe;
    // console.log(rating);
    const recipe = await Recipe.findById(req.params.id);
    // console.log(recipe);
    recipe.ratings.push(rating);
    // console.log(recipe);
    var total = 0;
    for (let rating of recipe.ratings){
        total += rating;
    }
    recipe.averageRating = Math.floor(total/recipe.ratings.length);
    await recipe.save();
    res.render('recipes/show', {recipe});
}));

router.post('/:id/saved', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    req.user.savedRecipes.push(recipe);
    await req.user.save();
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