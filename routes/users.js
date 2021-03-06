//User routes
const express = require('express');
const router = express.Router();

//Passport
const passport = require('passport');

//Models
const User = require('../models/user'); 

//Our Own Error Handling 
const catchAsync = require('../utils/catchAsync');

//Signup route
router.get('/signup', (req, res) =>{
    res.render('users/signup',{title:"signup"}); 
});

router.get('/signup', (req, res) =>{
    res.render('users/signup',{title:"signup"}); 
});

router.post('/signup', catchAsync(async(req, res, next) => {
    try{
        const {username, password, confirmPassword, profilePic} = req.body;
        console.log(profilePic);
        if(password !== confirmPassword){
            req.flash('error', 'Passowrd does not match!');
            return res.redirect('signup');
        }
        else{
            const user = new User({username, profilePic});
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if(err) return next(err);
                req.flash('success', 'Welcome to What the Fridge!');
                res.redirect('/');
            })
        } 
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('signup');
    }
}));

//Signin route
router.get('/signin', (req, res) =>{
    res.render('users/signin',{title:"sign in"}); 
});

router.post('/signin', passport.authenticate('local', {failureFlash: true, failureRedirect: '/signin'}), (req, res) =>{
    req.flash('success', 'welcome back');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

//Signout route
router.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', 'You have successfully loggedout');
    res.redirect('/');
});

//Profile route
router.get('/user', catchAsync(async(req, res) => {
     const user = await User.findById(req.user._id).populate('ownRecipes').populate('savedRecipes');
    res.render('users/profile', {user,title:'profile'});
}));



module.exports = router;


//reference
//https://stackoverflow.com/questions/29238060/how-to-use-same-the-form-for-post-and-put-requests-using-ejs