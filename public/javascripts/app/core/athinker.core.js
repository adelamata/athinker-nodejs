

	(function () {


		/**
		 * [athinker description]
		 * @type {Object}
		 */
		athinker 	   	 	= {};
		athinker.core 	 	= {};
		athinker.utils      = {};
		athinker.debug      = true;

		athinker.version 	= '0.0.1';


		/**
		 * [logger description]
		 * @param  {[type]} context [description]
		 * @param  {[type]} type    [description]
		 * @param  {[type]} msg     [description]
		 * @return {[type]}         [description]
		 */
		athinker.logger     = function (context, type, msg) {
			var self = this;
			if (athinker.debug) {
				switch (type) {
					case 'debug':
						console.debug ("[" + context + "] " + msg );
					break;
					case 'error':
						console.error ("[" + context + "] " + msg );
					break;
					case 'info':
						console.info ("[" + context + "] " + msg );
					break;
					default:
						console.log ("[" + context + "] " + msg );
					break;
				}
			}
		};

		athinker.utils.extend = function () {
			switch (arguments.length) {
				case 0:
					console.log (0);
				break;
				case 1:
					console.log (1);
				break;
				case 2:
					if ((typeof arguments [0] === 'object') && (typeof arguments [1] === 'object')) {
						var __p__ = arguments [0],
							__b__ = arguments [1],
							prop;
						for (prop in __b__) {
							__p__ [prop] = __b__ [prop];
						}
						return __p__;
					}
				break;
			}
		};

		/*athinker.utils.parseModelAttributes = function (attributes) {
			var attrs = [],
				__a__;
			for (__a__ in attributes) {
				attrs [attributes[__a__].index] 		 	 = {};
				attrs [attributes[__a__].index].$$dom 	     = athinker.utils.DOMQ (attributes [__a__].$dom) || null;
				attrs [attributes[__a__].index].$$validation = attributes [__a__].validation 			     || null;
				attrs [attributes[__a__].index].val          = "";
			}
			return attrs;
		};*/





		/**
		 * [domparser description]
		 * @type {Object}
		 */
		athinker.utils.DOMQ = (function () {
			var search = function (DOMquery) {
				document.querySelector(DOMquery)
			}

			return function (DOMquery) {
				return search (DOMquery);
			};
		})();
		
		athinker.$$dom = athinker.core.DOMQ;






		athinker.extend = function (moduleName, object) {
			if (moduleName && object) {

			}else {
				athinker.logger ("athinker::extend", 
					"error", 
					"Module name and object parameters must be sent.");
			}
		};

	})(window);
	
