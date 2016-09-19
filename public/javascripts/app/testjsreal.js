
	

	(function () {
		
		var userRepository = new UserRepository ("User Repository");
		var syncBtn        = $('.sync');
		var insertUserBtn  = $('.insert-user');
		var myNewModel     = null;
		var list    	   = $("#user-list");

		
        
        userRepository.on('clear', function () {
            console.log ("clear");
        });
        
         userRepository.on('synchronize', function (data) {
            console.log (userRepository.getRecords());
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
