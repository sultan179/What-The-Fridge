const ExpressError = require('./utils/ExpressError');
const {recipeSchema, commentSchema} = require('./schemas');

//Models
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');

//User authentication
module.exports.isLoggedIn = (req, res, next) => {
    console.log('Req.user...', req.user);
    if(!req.isAuthenticated()){
        //store the url they are requesting
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/signin');
    }
    next();
}
//Recipe Authorization
module.exports.isAuthor = async(req, res, next) =>{
    const{id} = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

//Comment Authorization
module.exports.isCommentAuthor = async(req, res, next) =>{
    const{id, commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

//Recipe data Validation
module.exports.validateRecipe = (req, res, next) => {
    const {error} = recipeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

//Comment data Validation
module.exports.validateComment = (req, res, next) => {
    const {error} = commentSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}