
	var User = athinker.core.model.extend (
		["name", "lastname", "phone", "other"], 
		// [{"index" : "name", 	"$dom" : "#userform > [name='name']",	  "validation" : "text"},
		//  {"index" : "lastname", "$dom" : "#userform > [name='lastname']", "validation" : "text"},
		//  {"index" : "phone", 	"$dom" : "#userform > [name='phone']",	  "validation" : "phone"},
		//  {"index" : "other", 	"$dom" : "#userform > [name='other']",    "validation" : "other"}],
		{
			modelName 		 : 'User',
			url     		 : 'users',
			customizeMethods : {
				getById : function () {}, 
				getAll  : function () {}
			}
		});

    var Car = athinker.core.model.extend (
		["color", "brand", "model", "cc", "cv"], 
		// [{"index" : "name", 	"$dom" : "#userform > [name='name']",	  "validation" : "text"},
		//  {"index" : "lastname", "$dom" : "#userform > [name='lastname']", "validation" : "text"},
		//  {"index" : "phone", 	"$dom" : "#userform > [name='phone']",	  "validation" : "phone"},
		//  {"index" : "other", 	"$dom" : "#userform > [name='other']",    "validation" : "other"}],
		{
			modelName 		 : 'User',
			url     		 : 'users',
			customizeMethods : {
				getById : function () {}, 
				getAll  : function () {}
			}
		});

	

	

