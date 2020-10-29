var express = require('express');
var router = express.Router();

const Validation = require('../utils/validation'); 
const ProductModel = require('../DB/model'); 

/* GET products listing. */
router.get('/', function(req, res, next) {
	ProductModel.find({}, (err, item) => { 
		if (err) { 
			res.status(400).send({message:err}); 
		} 
		else {
			res.json({
				message: "Success",
				products: item
			});	
		} 
	});
});

/* GET product. */
router.get('/:productId', function(req, res, next) {
	var productId = req.query.productId;
  	ProductModel.find({productId: productId}, (err, item) => { 
		if (err) { 
			res.status(400).send({message:err}); 
		} 
		else {
			if(item.length) {
				res.json({
					message: "Success",
					product: item[0]
				});	
			} else {
				res.status(400).send({message: "Incorrect ProductId"})
			}
		} 
	}); 
});

/* POST product. */
router.post('/', async function(req, res, next) {
	var validationObj = await Validation.createProduct(req.body);
	if (!validationObj.error) {
	  	var obj = req.body;
	  	obj.price = "Rs. " + obj.price;
	  	var prod = new ProductModel(obj);
	  	prod.save((err, item) => { 
			if (err) { 
				res.status(400).send({message:err}); 
			} else {
				res.json({
					message: "Success"
				});
			} 
		});
	} else {
		res.status(400).send({message: "Invalid Request"});
	}
});

/* Update product. */
router.put('/:productId', function(req, res, next) {
	if (Validation.updateProduct(req.body)) {
		var productId = req.query.productId;
		var obj = req.body;
	  	ProductModel.findOneAndUpdate({productId: productId}, obj, (err, item) => { 
			if (err) { 
				res.status(400).send({message:err}); 
			} else {
				res.json({
					message: "Success"
				});
			} 
		});
	} else {
		res.status(400).send({message: "Invalid Request"});
	}
});

/* Delete product. */
router.delete('/:productId', function(req, res, next) {
  	var productId = req.query.productId;
  	ProductModel.deleteOne({productId: productId}, (err, item) => { 
		if (err) { 
			res.status(400).send({message:err}); 
		} else {
			res.json({
				message: "Success"
			});
		} 
	});
});

module.exports = router;
