const express = require("express"); //setup a basic express server
const app = express(); //initialize a variable ,app is an express function with built in methods like app.use() app.get
const path = require('path');
const port = process.env.PORT||3000; //get an available port else take 3000
const recipe = require("./routes/recipe"); //all similar tasks routes should be imported
const connectDB = require("./db/connect"); //connect to db
require('dotenv').config()  

//Models
const Recipe = require('./models/recipe');

const mongoose = require("mongoose");                               // get mongoose
mongoose.connect('mongodb://127.0.0.1:27017/what-the-fridge');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Set ejs and path
app.set('view engine', 'ejs'); //get ejs 
app.set('views', path.join(__dirname, 'views')); //set path

app.use(express.json()); //parses incoming data to req.body
app.use("/api/v1", recipe); //REPLACE THE ENDPOINT WITH SPOONACULAR'S ROUTE

//Route path as set to home
app.get('/', (req, res) => {
    res.render('home');
});

// Show all Recipes in local mongodb
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes});
});

// Create Recipe in local mongodb
app.get('/makeRecipe', async (req, res) => {
    const recipe = new Recipe({name: "Taco"});
    await recipe.save();
    res.send(recipe);
});

// Show individual recipe
app.get('/recipes/:id', async(req, res) => {
    res.render('recipes/show');
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
})



// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI); //connect to database first before starting server,uri is in .env file and await the connection
   
//     app.listen(port, console.log(`server is listenin on port ${port}...`));
//   } catch (err) {
//     console.log(err);
//   }
// };
// start()
