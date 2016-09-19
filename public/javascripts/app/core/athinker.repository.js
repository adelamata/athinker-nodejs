/**
		 * [repository description]
		 * @type {Object}
		 */
		athinker.core.repository = {
            
			/**
			 * [extend description]
			 * @param  {[type]} properties [description]
			 * @return {[type]}            [description]
			 */
			extend : function (properties) {
				var self = this;
				if (properties) {

					athinker.logger ("athinker::core::repository", 
						"debug", 
						"The repository base " + ("[" + properties.repositoryName + "]" || "") + " was created.");

					var
					REPOSITORY = function (repositoryName) {

						this.name    	= repositoryName;
						this.records 	= [];
						this.callbacks	= {
							"synchronize" : function () {},
                            "clear"       : function () {}
						};

					};

					REPOSITORY.prototype 		= athinker.utils.extend ({}, athinker.core.repository);
					REPOSITORY.prototype.url	= properties.url;
					REPOSITORY.prototype.model  = properties.model;

					//
					// Clean extend method
					delete REPOSITORY.prototype.extend;
					
					
					return REPOSITORY;	
				}
			},



			/**
			 * [url description]
			 * @type {String}
			 */
			url         : '',

			/**
			 * [model description]
			 * @type {String}
			 */
			model       : '',



			//
			// Operations callback


			/**
			 * [_operation description]
			 * @type {Object}
			 */
			_operation  : {
				"synchronize"	: function () {
					athinker.logger("athinker::core:repository::" + this.name,
						"info", 
						"synchronize");
                    
					this._doRequest.call (this, "synchronize");
				}
			},

			
			
			/**
			 * [_storeData description]
			 * @param  {[type]} responseData [description]
			 * @return {[type]}              [description]
			 */
			_storeData : function (responseData) {
				var self = this;
				if (self.model) {
					var obj = null;
					
					responseData.forEach (function (element) {
						obj =  new self.model();
						obj.setData (element);
						self.records.push (obj);
					});

				} else {
					self.records = responseData;
				}
			},


			/**
			 * [_doRequest description]
			 * @param  {[type]} type       [description]
			 * @param  {[type]} throwEvent [description]
			 * @return {[type]}            [description]
			 */
			_doRequest : function (type) {
				var self = this;

				//
				// Send warning of requesting
				athinker.logger("athinker::core:repository::" + self.name, 
					"info", 
					self.name + " is doing request. Type [" + type + "].");
				
				$.ajax ({
					url       : "api/" + self.url + "/" + type,
					dataType  : 'json',
					success   : function (progress) {
						if (progress.OK) {
							self._storeData (progress.response);
						}else if (progress.FAIL) {

						}else {

						}
                        
                        self.callbacks [type].call (self, progress.response);
					},
					error : function (error) {
						console.log (error);
					}
				});
			},
            
            
            
            on : function (event, callback) {
                var self = this;
                if (self.callbacks [event]) {
                    self.callbacks [event] = callback;
                }
            },



			/**
			 * [synchronize description]
			 * @param  {[type]} throwEvent [description]
			 * @return {[type]}            [description]
			 */
			synchronize : function () {
				var self = this;
				self._operation.synchronize.call (self);
			},
            
            
            clear : function () {
                var self = this;
                self.records = [];
                self.callbacks.clear.call (self);
            },

			/**
			 * [getRecords description]
			 * @return {[type]} [description]
			 */
			getRecords  : function () {
				var self = this;
				return self.records;
			} 
		};