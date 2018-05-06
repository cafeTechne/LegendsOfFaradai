// controller.js
// The controller (MVC) portion of the client-side code.
// For use with MIT 6.005 Spring 2008 Project 6.
//
// Author: Aseem Kishore <aseem.kishore@gmail.com>
// License: none. Students are free to use and modify any portion of this
// code, as long as they maintain this header.
//
// Dependencies:
// - prototype.js (1.6)
// - model.js
// - view.js
//
//
// Description:
//
// The controller is a singleton object that encapsulates the handling of
// all user input from the view to the modification of the back-end model.
// Because nothing uses the controller, there is no reference to the actual
// controller object, and there are no public methods.


// this is a Javascript technique to create a singleton instance of an
// anonymous class, but not have it be pointed to by any variable.

(function(model, view) {
    
    // Fields

	var self = this; // for closure
    
    // Private methods

	function init() {
        view.addListener(self);
        model.setRefresh(true); // begin refreshing
	}

    // View listener methods
    
    this.onSendMessage = function(msg) {
        model.sendMessageToServer(msg);
    };
    
    this.onToggleRefresh = function() {
        model.toggleRefresh();
    };
    

	// wait for document to load before initializing controller
	Event.observe(window, "load", init);

})(Model, View); // calling an anonymous function
