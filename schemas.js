const Joi = require('joi');

module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        descriptions: Joi.string().required()
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        text: Joi.string().required()
    }).required()
});