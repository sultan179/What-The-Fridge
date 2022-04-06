//All require
const express = require("express"); 
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoose = require("mongoose"); 

//Routes
const recipesRoutes = require("./routes/recipes"); 
const commentsRoutes = require('./routes/comments');
const usersRoutes = require("./routes/users");

//Models
const User = require('./models/user');

//Our Own error Handling 
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//Morgan middleware good for debugging
// const morgan = require('morgan');
const app = express(); 

<<<<<<< HEAD
//MongoDB and Mongoose                          
mongoose.connect('mongodb://127.0.0.1:27017/what-the-fridge');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
=======


//Models
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');

const mongoose = require("mongoose");                               // get mongoose
const res = require("express/lib/response");
// mongoose.connect('mongodb://127.0.0.1:27017/what-the-fridge');

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });
>>>>>>> 9ed4418b295ba132a7a56f418c26a2be899c9c91

//App use
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

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
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware flash
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//EJS
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); //get ejs 
app.set('views', path.join(__dirname, 'views')); //set path

//Routes
app.use('/recipes', recipesRoutes);
app.use('/recipes/:id/comments', commentsRoutes);
app.use('/', usersRoutes);

//Route path as set to home
app.get('/', (req, res) => {
    res.render('home');
});

//About us Page
app.get('/about_us', (req, res) => {
    res.render('about_us');
});

<<<<<<< HEAD
=======

app.get('/result', (req, res) => {
    res.render('result');
});

//Add new Comments
// POST /recipes/:id/comments
app.post('/recipes/:id/comments', validateComment,catchAsync(async(req,res) => {
    const recipe = await Recipe.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    recipe.comments.push(comment);
    await comment.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
}));

//Comment delete
app.delete('/recipes/:id/comments/:commentId', catchAsync(async(req,res) => {
    const {id, commentId} = req.params;
    await Recipe.findByIdAndUpdate(id, {$pull: {commnets: commentId}});
    await Comment.findByIdAndDelete(req.params.commentId);
    res.redirect(`/recipes/${id}`);
}));

>>>>>>> 9ed4418b295ba132a7a56f418c26a2be899c9c91
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
<<<<<<< HEAD
app.listen(3000, () => {
    console.log("Serving on port 3000");
});
=======
// app.listen(3000, () => {
//     console.log("Serving on port 3000");
// });


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //connect to database first before starting server,uri is in .env file and await the connection

   
    app.listen(port, console.log(`server is listenin on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};
start()
>>>>>>> 9ed4418b295ba132a7a56f418c26a2be899c9c91
