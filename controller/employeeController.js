var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

var { body, validationResult } = require('express-validator');

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	res.render('employee',{uname: req.session.username});
});

router.get('/allproduct', function(req, res){
  userModel.getAllproduct(function(results){
		res.render('allproduct', { productlist : results, uname: req.session.username});
	});
});

router.get('/updateproduct/:id', function(req, res){

	userModel.gets(req.params.id, function(result){
		res.render('updateproduct', {product: result});
	});

});

router.post('/updateproduct/:id',[

body('product_name').not().isEmpty().withMessage('product_name empty'),
body('price').not().isEmpty().withMessage('price empty'),
body('quantity').not().isEmpty().withMessage('quantity empty')

], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){

		res.send("error in <br>"
			+ "no empty field")
	}else{
  var product = {
    id: req.params.id,
		product_name 		: req.body.product_name,
		quantity	: req.body.quantity,
		price		  : req.body.price
	}

  userModel.updateproduct(product, function(status){
		if(status){
			res.redirect('/employee/allproduct');
		}else{
			res.redirect('/login');
		}
	});
}
});

router.get('/deleteproduct/:id', function(req, res){

	userModel.getproduct(req.params.id, function(result){
		res.render('deleteproduct', {product: result});
	});

});

router.post('/deleteproduct/:id', function(req, res){

    userModel.deleteproduct(req.body.id, function(status){
  		if(status){
  			res.redirect('/employee/allproduct');
  		}else{
  			res.redirect('/login');
  		}
  	});

});

router.get('/addproduct', function(req, res){
    res.render('addproduct');
});
router.post('/addproduct',[

	body('product_name').not().isEmpty().withMessage('product_name empty'),
	body('price').not().isEmpty().withMessage('price empty'),
	body('quantity').not().isEmpty().withMessage('quantity empty')

] ,function(req, res){

	var errors = validationResult(req);
	if(errors.errors[0] != null){

		res.send("error in <br>"
			+ "no empty field")
	}else{
		var product = {
	    id: req.params.id,
			product_name 		: req.body.product_name,
			quantity	: req.body.quantity,
			price		  : req.body.price
		}

  userModel.insertproduct(product, function(status){
		if(status){
			res.redirect('/employee/allproduct');
		}else{
			res.redirect('/emoloyee/addproduct');
		}
	});
}

});

module.exports = router;
