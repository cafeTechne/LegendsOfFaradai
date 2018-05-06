// model.js
// The model (MVC) portion of the client-side code.
// For use with MIT 6.005 Spring 2008 Project 6.
//
// Author: Aseem Kishore <aseem.kishore@gmail.com>
// License: none. Students are free to use and modify any portion of this
// code, as long as they maintain this header.
//
// Dependencies:
// - index.html (for the CLIENT_ID variable only)
// - prototype.js (1.6)
// - constants.js
//
//
// Description:
//
// Model is a singleton object that encapsulates all of the system's data.
// It handles all communication with the server, and provides public
// (essentially static) getter/setter methods to work with this data.
//
// In addition, clients can listen for updates to the model by adding
// themselves as listeners via addListener(obj). The model notifies clients
// of updates via callback methods:
//
// - onGameResponse(msg) is called whenever a new game response is received
//      from the server. The response message is passed as the sole argument.
// - onChatMessage(msg) is called whenever a new chat message is received
//		from the server. The chat message is passed as the sole argument.
// - onNotification(msg) is called whenever a new notification is received
//		from the server. The notification is passed as the sole argument.
// - onNewImage(url) is called whenever a new image is received from the
//      server. The source URL of the image is passed as the sole argument.
// - onMove(url) is called whenever the user is being moved to another MUD.
//		The destination MUD's URL is passed as the sole argument.
//
// If a client doesn't have the appropriate callback method for a certain
// update, the update is ignored for that client, so clients can choose to
// support only certain updates without risk of errors.


// this is a Javascript technique to make a singleton instance of an
// anonymous class...

var Model = new (function() {
	
	// Inner classes
	
	/**
	 * This is a wrapper class for any class that wants to listen to us that
	 * checks if the listening class has a method before it executes it.
	 * This lets us safely call all handler methods without worrying if the
	 * listening class supports those methods or not.
	 */
	var Listener = function(obj) {
		
		// Convenience fields (shorter names)
		var oGR = obj.onGameResponse;
		var oCM = obj.onChatMessage;
		var oN = obj.onNotification;
		var oNI = obj.onNewImage;
		var oM = obj.onMove;
		
		this.onGameResponse = function(msg) {
			if (oGR && (typeof oGR) == "function") {
				oGR(msg);
			}
		};
		
		this.onChatMessage = function(msg) {
			if (oCM && (typeof oCM) == "function") {
				oCM(msg);
			}
		};
		
		this.onNotification = function(msg) {
			if (oN && (typeof oN) == "function") {
				oN(msg);
			}
		};
		
		this.onNewImage = function(url) {
			if (oNI && (typeof oNI) == "function") {
				oNI(url);
			}
		};
		
		this.onMove = function(url) {
			if (oM && (typeof oM) == "function") {
				oM(url);
			}
		};
		
	};
    
    // Fields

	var self = this; // for closure
	var timerId = null;
	var listeners = [];

	// server constants, redeclared as shorter names for convenience
	var SEND_URI = Constants.SERVER.SEND_URI;
	var REFRESH_URI = Constants.SERVER.REFRESH_URI;
	var ID_ARG = Constants.SERVER.ID_ARG;
	var MSG_ARG = Constants.SERVER.MSG_ARG;
	var TIMER = Constants.SERVER.REFRESH_INTERVAL;
    
    // Private methods

	/**
	 * Sends a refresh request to the server. The response is handled by the
	 * refresh() method.
	 */
	function sendRefreshRequest() {
		var parameters = {};
		parameters[ID_ARG] = CLIENT_ID;
        parameters["rand"] = Math.random(); // to prevent browser caching

		new Ajax.Request(REFRESH_URI, {
			parameters : parameters,
			onSuccess : refresh
		});
	}

	/**
	 * Refreshes the model based on the response in the given XMLHttpRequest.
	 * This method should never be called directly!
	 */
	function refresh(xhr) {
		if (!xhr || !xhr.responseText) {
			return;
		}
		
		// remove all trailing and leading whitespace
		var text = xhr.responseText.strip();

		// ignore if response was only whitespace
		if (!text) {
			return;
		}

		// TODO if using some text protocol between client and server,
		// parse response here...
		var msg = text;
		
		// if a response from the game:
		handleGameResponse(msg);
		// if a chat messsage:
		//	handeChatMessage(msg);
		// if a notification:
		//	handleNotification(msg);
		// if a new image:
		//	handleNewImage(msg);
		// if being moved:
		//	handleMove(msg);
	}

	function handleGameResponse(msg) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onGameResponse(msg);
		}
	}
	
	function handleChatMessage(msg) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onGameMessage(msg);
		}
	}
	
	function handleNotification(msg) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onNotification(msg);
		}
	}
	
	function handleNewImage(url) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onNewImage(url);
		}
	}
	
	function handleMove(url) {
		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onMove(url);
		}
	}

	// Public (closure-priveleged) methods
	
	/**
	 * Adds the given object as a listener for updates to this model.
	 */
	this.addListener = function(obj) {
		// wrap obj around our Listener class, and add it
		listeners.push(new Listener(obj));
	};

    /**
	 * Sets whether this model should be regularly sending refresh requests.
	 * Stops refreshing if the given argument is false, otherwise starts.
     */
	this.setRefresh = function(bool) {
		// first, stop the refreshing if it's going on right now
		if (timerId) {
			window.clearInterval(timerId);
			timerId = null;
		}
		
		// then, start again if we should be refreshing
		if (bool) {
            sendRefreshRequest();
			timerId = window.setInterval(sendRefreshRequest, TIMER);
		}
	};
    
    /**
     * Convenience method to toggle the refresh behavior.
     */
    this.toggleRefresh = function() {
        if (timerId) {
            self.setRefresh(false);
        } else {
            self.setRefresh(true);
        }
    };

    /**
     * Asynchronously sends the given message (i.e. command) to the server.
     */
	this.sendMessageToServer = function(message) {
		var parameters = {};
		parameters[ID_ARG] = CLIENT_ID;
		parameters[MSG_ARG] = message;
		parameters["rand"] = Math.random(); // to prevent browser caching

		new Ajax.Request(SEND_URI, {
			parameters : parameters
		});
	};

})();
