var Joi = require('joi');

var createProduct = async function(prod) {
	var schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		quantity: Joi.number().required(),
		brand: Joi.string().required(),
		price: Joi.number().required()
	});
	return schema.validate(prod);
};

var updateProduct = async function(prod) {
	var schema = Joi.object({
		title: Joi.string(),
		description: Joi.string(),
		quantity: Joi.number(),
		brand: Joi.string(),
		price: Joi.number()
	});
	return schema.validate(prod);
};

module.exports = {
	createProduct: createProduct,
	updateProduct: updateProduct
};