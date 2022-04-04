const express = require("express"); //setup a basic express server
const app = express(); //initialize a variable ,app is an express function with built in methods like app.use() app.get
const path = require('path');
const port = process.env.PORT||3000; //get an available port else take 3000
const recipe = require("./routes/recipe"); //all similar tasks routes should be imported
const connectDB = require("./db/connect"); //connect to db
require('dotenv').config()



//validating data
const {recipeSchema} = require('./schemas');
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

//method override for form post
const methodOverride = require('method-override');

//ejs-mate for better merging ejs files
const ejsMate = require('ejs-mate');

//Error stuff
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//Morgan middleware good for debugging
// const morgan = require('morgan');



//Models
const Recipe = require('./models/recipe');

const mongoose = require("mongoose");                               // get mongoose
const res = require("express/lib/response");
mongoose.connect('mongodb://127.0.0.1:27017/what-the-fridge');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Set ejs and path
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); //get ejs 
app.set('views', path.join(__dirname, 'views')); //set path

//Need to parse req.body to sending info
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));

app.use(express.json()); //parses incoming data to req.body
app.use("/api/v1", recipe); //REPLACE THE ENDPOINT WITH SPOONACULAR'S ROUTE

//log reuests with morgan good for debugging
// app.use(morgan('tiny'));

//Route path as set to home
app.get('/', (req, res) => {
    res.render('home');
});

// Show all Recipes in local mongodb
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes});
});

//Get request to show the page of adding the recipe
app.get('/recipes/new', (req, res) => {
    res.render('recipes/new');
});

//Add New Recipe
app.post('/recipes', validateRecipe, catchAsync(async(req, res, next) =>{
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`); 
}));

// Show individual recipe
app.get('/recipes/:id', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/show', {recipe});
}));

//Show Edit Recipes page
app.get('/recipes/:id/edit', catchAsync(async(req, res) =>{
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', {recipe});
}));

//Put Edit page
app.put('/recipes/:id', validateRecipe, catchAsync(async(req, res) =>{
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
    res.redirect(`/recipes/${recipe._id}`);
}));

//Delete Recipe
app.delete('/recipes/:id', catchAsync(async (req,res)=>{
    const {id} = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}));

//About us Page
app.get('/about_us', (req, res) => {
    res.render('about_us');
});

//Error Handling
app.all('*', (req, res, nexts) => {
    next(new ExpressError('Page not found', 404));
});

//Error Handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

//Easy listening
app.listen(3000, () => {
    console.log("Serving on port 3000");
});



// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI); //connect to database first before starting server,uri is in .env file and await the connection
   
//     app.listen(port, console.log(`server is listenin on port ${port}...`));
//   } catch (err) {
//     console.log(err);
//   }
// };
// start()
