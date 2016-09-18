
/**
 * [model description]
 * @type {Object}
 */
athinker.core.model = {

    /**
     * [extend description]
     * @param  {[type]} properties [description]
     * @param  {[type]} model      [description]
     * @return {[type]}            [description]
     */
    extend : function (properties, model) {
        var self = this;
        if (properties && model) {

            athinker.logger ("athinker::core::model", 
                "debug", 
                "The model base " + ("[" + model.modelName + "]" || "") + " was created.");


            var 
            MODEL = function (modelName) {

                this.type = model.modelName || "Model";
                this.name = modelName;

                //
                // Object properties
                this.currAttributesValues = {};
                this.lastAttributesValues = {};


                athinker.logger ("athinker::core::model::" + this.name, 
                    "info",
                    this.name + " model was created.");

            };


            MODEL.prototype     		= athinker.utils.extend ({}, athinker.core.model);
            MODEL.prototype._attributes = parseAttributes (properties);
            MODEL.prototype._url 		= model.url;


            if (model.customizeMethods) {
                var customizeMethods = Object.keys(model.customizeMethods),
                    customizeMethodsLength = customizeMethods.length;
                
                for (var i = 0; i < customizeMethodsLength; i++) {
                    MODEL.prototype [customizeMethods [i]] = model.customizeMethods [customizeMethods [i]];
                }
            }

            //
            // Clean extend method
            delete MODEL.prototype.extend;

            return MODEL;	

        } else {
            athinker.logger ("athinker::core::model::" + self.name, 
                "error", 
                "Defining model need properties and model");
        }


        function parseAttributes (attrs) {
            var parsedAttributes = [];

            if (attrs.length && attrs.length > 1) {
                for (a in attrs) {
                    parsedAttributes.push (attrs[a]);
                }
            }

            return parsedAttributes;
        };
    },

    /**
     * [url description]
     * @type {String}
     */
    _url         : '',

    /**
     * [_attributes description]
     * @type {Array}
     */
    _attributes : [],

    /**
     * [_operation description]
     * @type {Object}
     */
    _operation  : {
        "update" 		: function () {
            athinker.logger ("athinker::core:model::" + this.name, 
                "info", 
                "update");

            this._doRequest.call (this, "update", this.currAttributesValues);
        },
        "create" 		: function () {
            athinker.logger ("athinker::core:model::" + this.name, 
                "info", 
                "create");

            this._doRequest.call (this,"create", this.currAttributesValues);
        },
        "delete" 		: function () {
            athinker.logger ("athinker::core:model::" + this.name, 
                "info", 
                "delete");

            this._doRequest.call (this,"delete");
        },
        "synchronize"	: function () {
            athinker.logger ("athinker::core:model::" + this.name,
                "info", 
                "synchronize");

            this._doRequest.call (this,"synchronize");
        }
    },


    /**
     * [_doRequest description]
     * @param  {[type]} type [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    _doRequest : function (type, data) {
        var self = this;
        
        //
        // Send warning of requesting
        athinker.logger ("athinker::core:model::" + self.name, 
            "info", 
            self.name + " is doing request. Type [" + type + "].");

        $.ajax ({
            url     	: "api/" + self._url + "/" + type,
            data    	: data || {},
            method  	: 'post',
            dataType    : 'json',
            success : function (progress) {
                if (progress.OK) {
                    console.log ("OK, everything was good! :)");
                } else if (progress.FAIL) {

                }else {

                }
            },
            error : function (error) {
                console.log (error);
            }
        })
    },


    /**
     * [update description]
     * @return {[type]} [description]
     */
    update 		: function () {
        var self = this;
        self._operation.update.call (self);
    },

    /**
     * [create description]
     * @return {[type]} [description]
     */
    create 		: function () {
        var self = this;
        self._operation.create.call (self);
    },

    /**
     * [delete description]
     * @return {[type]} [description]
     */
    delete 		: function () {
        var self = this;
        self._operation.delete.call (self);
    },

    /**
     * [synchronize description]
     * @return {[type]} [description]
     */
    synchronize : function () {
        var self = this;
        self._operation.synchronize.call (self);
    },

    /**
     * [attr description]
     * @param  {[type]} attr [description]
     * @return {[type]}      [description]
     */
    attr : function (attr) {
        var self = this;
        if (self._attributes[attr]) {
            return self._attributes[attr];
        }else {
            athinker.logger ("athinker::core:model::" + self.name,
                "error", 
                "[" + attr + "] not is attribute of this model.");
        }
    },


    /**
     * [setData description]
     * @param {[type]} object [description]
     */
    setData     : function (object) {
        var self = this;
        if (Object.keys (object).length > 0) {
            for (a in object) {
                if (self._attributes.indexOf (a) !== -1) {
                    self.currAttributesValues [a] = object [a];
                }
            }
        }
    },

    //
    // You can extend with more public specifics
    // methods


};