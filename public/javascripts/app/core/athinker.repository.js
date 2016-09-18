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
							synchronize : null
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
				"synchronize"	: function (throwEvent) {
					athinker.logger("athinker::core:repository::" + this.name,
						"info", 
						"synchronize");
					this._doRequest.call (this,"synchronize", throwEvent || true);
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
			_doRequest : function (type, throwEvent) {
				var self = this;

				//
				// Send warning of requesting
				athinker.logger("athinker::core:repository::" + this.name, 
					"info", 
					this.name + " is doing request. Type [" + type + "].");
				
				$.ajax ({
					url       : "api/" + this.url + "/" + type,
					dataType  : 'json',
					success   : function (progress) {

						if (progress.OK) {

							self._storeData (progress.response);

							if (throwEvent) {
								if (self.callbacks [type])
								self.callbacks [type].call (self, self.records);
							}
							

						}else if (progress.FAIL) {

						}else {

						}
					},
					error : function (error) {
						console.log (error);
					}
				});
			},

			/**
			 * [onSynchronize description]
			 * @param  {Function} fn [description]
			 * @return {[type]}      [description]
			 */
			onSynchronize : function (fn) {
				var self = this;
				if (fn) self.callbacks.synchronize = fn;
			},



			/**
			 * [synchronize description]
			 * @param  {[type]} throwEvent [description]
			 * @return {[type]}            [description]
			 */
			synchronize : function (throwEvent) {
				var self = this;
				self._operation.synchronize.call (self, throwEvent);
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