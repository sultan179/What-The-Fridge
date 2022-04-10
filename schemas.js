const Joi = require('joi');

module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        ingredients:Joi.string().required(),
        directions: Joi.string().required(),
        rating: Joi.number().min(1).max(5),
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        text: Joi.string().required()
    }).required()
});