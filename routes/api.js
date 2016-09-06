var express = require('express');
var router = express.Router();


var usersStorage = [
	{"user" : "user 1"},
	{"user" : "user 2"},
	{"user" : "user 3"}
];

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
	res.json ({"OK" : "The operation was succesful."});
});
module.exports = router;
