// constants.js
// Constant values for use with the HTML and CSS portions of the code.
// For use with MIT 6.005 Spring 2008 Project 6.
//
// Author: Aseem Kishore (akishore@mit.edu)
// License: none. Students are free to use and modify any portion of this
// code, as long as they maintain this header.
//
// Dependencies:
// - index.html
// - style.css
//
// Instructions:
// Change this file whenever you change/add/remove any id's from the HTML,
// class names used by the CSS, and similar other constants.
// To reference any of these constants, use the Constants namespace.
// e.g. alert("To get the output div, use the id " + Constants.IDS.OUTPUT);


var Constants = {
    
    /**
     * The id's of the various HTML elements.
     */
    IDS: {
        FORM: "form",
        BODY: "body",
        OUTPUT: "output",
        IMAGES: "images",
        MESSAGES: "messages",
        INPUT: "input",
        TEXT: "text",
        SEND: "send"
    },
    
    /**
     * The class names used by the CSS to style the elements.
     */
    CLASSES: {
        COMMAND: "command",
        GAME_RESPONSE: "response",
        CHAT_MESSAGE: "chat",
        NOTIFICATION: "notification"
    },
    
    /**
     * The sizing constants, some defined in the CSS.
     */
    SIZES: {
        MARGIN: 10,
        PADDING: 10,
        BORDER: 1,
        RATIO: 0.5 // ratio of images div height to total output div height
    },
    
    /**
     * The pre-defined URIs and arguments used to communicate to the server.
     */
    SERVER: {
        REFRESH_URI: "/refresh",
        SEND_URI: "/send",
        ID_ARG: "id",
        MSG_ARG: "msg",
		REFRESH_INTERVAL: 1000 // in millis
    }
    
};
