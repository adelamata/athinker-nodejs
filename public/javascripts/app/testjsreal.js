
	

	(function () {
		
		var userRepository = new UserRepository ("User Repository");
		var syncBtn        = $('.sync');
		var insertUserBtn  = $('.insert-user');
		var myNewModel     = null;
		var list    	   = $("#user-list");

		



		//
		// User repository on synchronize
		userRepository.onSynchronize (function (records) {
			
			//
			// Clean list
			list.empty();

			//
			// Repaint list
			$.each (records, function (index, element) {
				console.log (element.attr('name'));
				list.append ("<li>" + element.attr('name') + "</li>");
			});	


		});




		syncBtn.click (function () {
			userRepository.synchronize ();
		});


		insertUserBtn.click (function () {
			myNewModel 	= new User ("User 1");
			myNewModel.setData({"user" : "New user"});
			myNewModel.create();
			userRepository.synchronize ();
		});




	})(window);
