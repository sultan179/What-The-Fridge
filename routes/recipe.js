const express=require('express')
const router=express.Router();
const {getAllRecipes,createRecipe,getRecipe}=require('../controllers/recipe')

router.route('/recipe').get(getAllRecipes).post(createRecipe)

router.route('/:id').get(getRecipe)



module.exports=router;
