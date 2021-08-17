(function() {
  'use strict';

  this.cronapi = this.cronapi || {};

   /**
   * @categoryName My Functions
   */
  this.cronapi.myfunctions = this.cronapi.myfunctions || {};
  
  /**
   * @type function
   * @name New Function
   * @description Function Description
   * @multilayer false
   * @param {ObjectType.STRING} input Param Description
   * @returns {ObjectType.STRING}
   */
  this.cronapi.myfunctions.newFunction = function(/** @type {ObjectType.STRING} @description Parameter: Parameter description */input) {
    return "INPUT" + input;
  };
  

}).bind(window)();