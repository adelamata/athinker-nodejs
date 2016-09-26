var express = require('express');
var router = express.Router();


var usersStorage = [{"name" : "Antonio", "lastName" : "de la Mata López", "phone" : "668580 375", "other" : "other"},
                   {"name" : "Andrea", "lastName" : "Martín Morante", "phone" : "668580375", "other" : "other"}];

router.get('/users/synchronize', function (req, res, next) {
	res.json ({"OK" : "The operation was succesful.", "response" : usersStorage});
});

/* GET users listing. */
router.post('/users/update', function(req, res, next) {
	var updateData = req.body;


 	res.json ({"OK" : "The operation was succesful.", "response" : updateData});
});


router.post ('/users/create', function (req, res, next) {
	var data = req.body;
	usersStorage.push (data);
    console.log (usersStorage);
	res.json ({"OK" : "The operation was succesful."});
});
module.exports = router;
