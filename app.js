const express = require("express"); 
const app = express(); 
const path = require('path');
const port = process.env.PORT||3000; 
const session = require('express-session');

const connectDB = require("./db/connect"); 
require('dotenv').config()
const passport = require('passport');
const LocalStrategy = require('passport-local');

//Routes
const recipes = require("./routes/recipes"); 
const comments = require('./routes/comments');
const users = require("./routes/users");

//Models
const User = require('./models/user');

//method override for form post
const methodOverride = require('method-override');

//Our Own error Handling 
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//Morgan middleware good for debugging
// const morgan = require('morgan');

//Session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig));

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//log reuests with morgan good for debugging
// app.use(morgan('tiny'));
const mongoose = require("mongoose");                               
// const res = require("express/lib/response");
mongoose.connect('mongodb://127.0.0.1:27017/what-the-fridge');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Set ejs and path
//ejs-mate for better merging ejs files
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); //get ejs 
app.set('views', path.join(__dirname, 'views')); //set path

//Need to parse req.body to sending info
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.json()); //parses incoming data to req.body

//Routes
app.use('/recipes', recipes);
app.use('/recipes/:id/comments', comments);
app.use('/', users);

//Route path as set to home
app.get('/', (req, res) => {
    res.render('home');
});

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
