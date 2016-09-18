
	

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
            var name = $('#new-user').find('.name').val(),
                lastName = $('#new-user').find('.lastname').val(),
                phone = $('#new-user').find('.phone').val(),
                other = $('#new-user').find('.other').val();
            
            
			myNewModel 	= new User (name);
			myNewModel.setData({"name" : name, "lastname": lastName, "phone" : phone, "other" : other});

			myNewModel.create();
		});




	})(window);
