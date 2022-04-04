const Joi = require('joi');

module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required()
    }).required()
});