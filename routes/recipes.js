const express = require('express')
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

//Models
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

const {recipeSchema, commentSchema} = require('../schemas');
const validateRecipe = (req, res, next) => {
    const {error} = recipeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

// Show all Recipes in local mongodb
router.get('/', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes});
});

//Get request to show the page of adding the recipe
router.get('/new', (req, res) => {
    res.render('recipes/new');
});

//Add New Recipe
router.post('/', validateRecipe, catchAsync(async(req, res, next) =>{
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`); 
}));

// Show individual recipe
router.get('/:id', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('comments');
    res.render('recipes/show', {recipe});
}));

//Show Edit Recipes page
router.get('/:id/edit', catchAsync(async(req, res) =>{
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', {recipe});
}));

//Put Edit page
router.put('/:id', validateRecipe, catchAsync(async(req, res) =>{
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
    res.redirect(`/recipes/${recipe._id}`);
}));

//Delete Recipe
router.delete('/:id', catchAsync(async (req,res)=>{
    const {id} = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}));


module.exports = router;
