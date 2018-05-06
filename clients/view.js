// view.js
// The view (MVC) portion of the client-side code.
// For use with MIT 6.005 Spring 2008 Project 6.
//
// Author: Aseem Kishore <aseem.kishore@gmail.com>
// License: none. Students are free to use and modify any portion of this
// code, as long as they maintain this header.
//
// Dependencies:
// - index.html
// - prototype.js (1.6)
// - constants.js
// - scrollpane.js
// - model.js
//
//
// Instructions:
//
// View is a singleton object that encapsulates all of the system's output,
// given a model that encapsulates the system's data. It resizes all elements
// to fit within the screen space when the page first loads, and provides
// public (essentially static) setter methods to modify the output.
//
// In addition, clients can listen for user inputs to the view by adding
// themselves as listeners via addListener(obj). The view notifies clients
// of user inputs via callback methods:
//
// - onSendMessage(msg) is called whenever the user presses enter on the
//      textbox or presses the "Send" button and the textbox is not empty.
//      The value of the textbox is passed as the sole argument.
// - onToggleRefresh() is called whenever the user clicks the link to toggle
//      refresh behavior.
//
// If a client doesn't have the appropriate callback method for a certain
// update, the update is ignored for that client, so clients can choose to
// support only certain updates without risk of errors.
//
// Examples: (only after page has loaded)
//
// View.onNewImage("http://www.google.com/intl/en_ALL/images/logo.gif");
// View.onChatMessage("<b>Akishore says:</b> Hello everyone!");


// this is a Javascript technique to make a singleton instance of an
// anonymous class...

var View = new (function(model) {
    
    // Inner classes
    
    /**
     * This is a wrapper class for any class that wants to listen to us that
     * checks if the listening class has a method before it executes it.
     * This lets us safely call all handler methods without worrying if the
     * listening class supports those methods or not.
     */
    var Listener = function(obj) {
        
        // Convenience fields (shorter names)
        var oSM = obj.onSendMessage;
        var oTR = obj.onToggleRefresh;
        
        this.onSendMessage = function(msg) {
            if (oSM && (typeof oSM) == "function") {
                oSM(msg);
            }
        };
        
        this.onToggleRefresh = function() {
            if (oTR && (typeof oTR) == "function") {
                oTR();
            }
        };
        
    };
    
    // Fields

    var self = this; // for closure
    var messagesPane = null;
    var listeners = [];

    // element references
    var bodyDiv;
    var outputDiv;
    var imagesDiv;
    var messagesDiv;
    var inputDiv;
    var form;
    var textbox;
    var sendButton;
    var toggler;

    // sizing constants, redeclared with shorter names for convenience.
    // all are in pixels.
    var MARGIN = Constants.SIZES.MARGIN;
    var PADDING = Constants.SIZES.PADDING;
    var BORDER = Constants.SIZES.BORDER
    var RATIO = Constants.SIZES.RATIO;
    
    // css class names, redeclared with shorter names for convenience.
    var COMMAND = Constants.CLASSES.COMMAND;
    var RESPONSE = Constants.CLASSES.GAME_RESPONSE;
    var CHAT = Constants.CLASSES.CHAT_MESSAGE;
    var NOTIF = Constants.CLASSES.NOTIFICATION;
    
    // Private methods

    /**
     * Initializes the view. This should only be called once, after the page
     * has been loaded.
     */
    function init() {
        captureElements();
        addEventListeners();
        setSizes();
        
        messagesPane = new ScrollPane(messagesDiv);
        textbox.focus();
    }

    /**
     * Captures the page's elements. This should only be called after the page
     * has been loaded.
     */
    function captureElements() {
        bodyDiv = $(Constants.IDS.BODY);
        outputDiv = $(Constants.IDS.OUTPUT);
        imagesDiv = $(Constants.IDS.IMAGES);
        messagesDiv = $(Constants.IDS.MESSAGES);
        inputDiv = $(Constants.IDS.INPUT);
        form = $(Constants.IDS.FORM);
        textbox = $(Constants.IDS.TEXT);
        sendButton = $(Constants.IDS.SEND);
        
        // toggler is meant to be a little link that allows us to start or
        // stop refreshing... useful for debugging
        toggler = new Element("a", {href:"#"}).update("stop refreshing");
        document.body.appendChild(toggler);
    }
    
    /**
     * Adds this view as an event listener to the appropriate event sources.
     * This should only be called once, after the page has been loaded.
     */
    function addEventListeners() {
        model.addListener(self);
        form.onsubmit = handleFormSubmit;
        toggler.onclick = handleToggleRefresh;
    }

    /**
     * Appropriately sizes the view to fit within the available screen space.
     * This should only be called after the elements have been captured.
     */
    function setSizes() {
        // fill the total dimensions
        var totalHeight = document.viewport.getHeight() - 2 * MARGIN;
        var totalWidth = bodyDiv.getWidth();

        // find the height our input (text field + send button) needs
        // derive the height of the output accordingly
        var inputHeight = Math.max(textbox.getHeight(), sendButton.getHeight());
        var outputHeight = totalHeight - inputHeight - MARGIN;

        // set the top-level heights by ratio
        bodyDiv.style.height = totalHeight + "px";
        inputDiv.style.height = inputHeight + "px";
        outputDiv.style.height = outputHeight + "px";

        // set the output div heights
        imagesDiv.style.height = (Math.round(RATIO * outputHeight) - 2 * PADDING - 2 * BORDER) + "px";
        messagesDiv.style.height = (outputHeight - imagesDiv.getHeight() - MARGIN - 2 * PADDING - 2 * BORDER) + "px";
        messagesDiv.style.marginTop = (outputHeight - imagesDiv.getHeight() - messagesDiv.getHeight() - 1) + "px";

        // set the input form widths
        textbox.style.width = (totalWidth - sendButton.getWidth() - MARGIN - PADDING - 2 * BORDER) + "px";
        
        // position the toggler link to be the top-right of the screen
        toggler.style.position = "fixed";
        toggler.style.top = "5px";
        toggler.style.right = "5px";
    }
    
    function handleFormSubmit() {
        if (textbox.value) {
            // submitting form means sending a message
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].onSendMessage(textbox.value);
            }
        }
        
        // this could go in the controller; here for convenience
        addMessage(textbox.value, COMMAND);
        textbox.clear();
        textbox.focus();
        
        return false; // so browser doesn't reload page
    }
    
    function handleToggleRefresh() {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].onToggleRefresh();
        }
        
        // this could go in the controller; here for convenience
        if (toggler.innerHTML == "start refreshing") {
            toggler.update("stop refreshing");
        } else {
            toggler.update("start refreshing");
        }
        
        return false; // so browser doesn't process link
    }

    /**
     * Loads, places and appropriately resizes the image at the given URL.
     * If the srcUrl parameter is missing or empty, the image is simply
     * removed. If the image does not load, no image will be shown.
     */
    function setImage(srcUrl) {
        // remove the current image
        while (imagesDiv.firstChild) {
            imagesDiv.removeChild(imagesDiv.firstChild);
        }

        // if no srcUrl given, or empty string, do nothing else
        if (!srcUrl) {
            return;
        }

        // add an image to the DOM, so we can size it, but it should be invisible
        var image = document.createElement("img");
        imagesDiv.appendChild(image);
        image.hide();

        // add a load listener to the image first, to resize it
        image.onload = function() {
            // get the width-to-height ratio, so we can preserve it
            var ratio = image.getWidth() / image.getHeight();

            // our bounds
            var maxWidth = imagesDiv.getWidth() - 2 * PADDING;
            var maxHeight = imagesDiv.getHeight() - 2 * PADDING;

            // scale down so that it fits within the width bound
            if (image.getWidth() > maxWidth) {
                image.style.width = maxWidth + "px";
                image.style.height = Math.round(image.getWidth() / ratio) + "px";
            }

            // repeat for the height bound
            if (image.getHeight() > maxHeight) {
                image.style.height = maxHeight + "px";
                image.style.width = Math.round(image.getHeight() * ratio) + "px";
            }

            // now that it's properly scaled, unhide it
            image.show();
        };

        // now start loading the image...
        image.src = srcUrl;
    }

    /**
     * Adds a new div with the given classname and the given message into
     * the message pane, and scrolls the pane appropriately.
     */
    function addMessage(message, className) {
        var div = []; // an array of strings, like a string builder
        
        div.push('<div class="' + className + '">');
        div.push(message);
        div.push('</div>');
        
        messagesDiv.innerHTML += div.join('\n');
        messagesPane.autoScroll(true); // true means always scroll
    }

    // Public (closure-priveleged) methods
    
    /**
     * Adds the given object as a listener for user inputs to this view.
     */
    this.addListener = function(obj) {
        listeners.push(new Listener(obj));
    };
    
    // Model listener methods
    
    /**
     * Adds the given game response to the message pane.
     */
    this.onGameResponse = function(msg) {
        addMessage(msg, RESPONSE);
    };
    
    /**
     * Adds the given chat message to the message pane.
     */
    this.onChatMessage = function(msg) {
        addMessage(msg, CHAT);
    };
    
    /**
     * Adds the given notification to the message pane.
     */
    this.onNotification = function(msg) {
        addMessage(msg, NOTIF);
    }

    /**
     * Sets the image to be that at the given url.
     */
    this.onNewImage = function(url) {
        setImage(url);
    };
    
    /**
     * Redirects the user to the given url after a brief delay.
     */
    this.onMove = function(url) {
        // wait 3 seconds before redirecting...
        window.setTimeout(function() {
            document.location = url; // redirect
        }, 3000);
    };
    

    // wait for document to load before initializing view
    Event.observe(window, "load", init);

})(Model); // create a new view with the main Model as its model
