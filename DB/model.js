const mongoose = require('mongoose'); 

const Products = new mongoose.Schema({ 
	title: {type: String, required: true},
	description: {type: String, required: true},
	quantity: {type: Number, required: true},
	brand: {type: String, required: true},
	price: {type: String, required: true}
}, { timestamps: true }); 

module.exports = new mongoose.model('Products', Products); 