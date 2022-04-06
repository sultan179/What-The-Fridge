const Recipe = require("../models/recipe");

const getAllRecipes =async (req, res)=> {

  try{
    const recipes = await Recipe.find({});
    res.status(200).json({ recipes }); //all meals are returned to the postman client (just for testing purpose)
  }
  catch(err){

    res.status(401).json({msg:"meals are not found"})

  }
 
 
};

const createRecipe =async (req, res) => {
    try{
      console.log(req.body)
      const recipe = await Recipe.create(req.body);
      res.status(201).json({ recipe}); //single recipe is created to the db  (just for testing purpose)
    }
    catch(err){
       res.status(400).json({msg:"recipe cannot be created due to an error"})
    }
};

const getRecipe= async (req, res )=> {

    const { id: recipeID } = req.params;
    const recipe= await Recipe.findOne({ _id: recipeID });
   
    if (!recipe) {
       res.status(401).json({msg:"no recipe found"})
        }

    res.status(200).json({ task });
  
    
 
   
 
};





module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
};
