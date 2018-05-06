// scrollpane.js
// Automatically scrolling divs, cross-browser and 
//
// Author: Aseem Kishore <aseem.kishore@gmail.com>
// License: none. You are free to use and modify this code, as long as you
// maintain this header.
//
// Note: Much of this code is originally by Eric Pascarello. See:
// http://radio.javaranch.com/pascarello/2006/08/17/1155837038219.html
// I've modified this code to make it object-oriented and use prototype.js.
// The auto-scroll behavior was also buggy, so I've added the ability for
// clients to bypass the checking and have it always scroll.
//
// Dependencies:
// - prototype.js (1.6)
//
// Instructions:
// To make a new ScrollPane out of a <div> element, pass the <div> into the
// ScrollPane constructor. To automatically scroll it to the bottom, call
// the autoScroll() method, passing true to have it always scroll.
// 
// Example:
// var div = document.getElementById("some_div_id");
// var pane = new ScrollPane(div);
// pane.autoScroll(true);


/**
 * Transforms the given <div> element into a scroll pane. Creates and
 * returns a controller object for the scroll pane.
 */
var ScrollPane = function(div) {
    
    // Fields

	var self = this; // for closure
	var bottomThreshold = 20;
	var lastScrollPosition = 100000000;
	var currentHeight = 0;
    
    // Constructor

	div.style.overflow = "auto";
    
    // Private methods

	function userHasScrolled() {
		return lastScrollPosition != div.scrollTop;
	}

	function scrollIfInZone(always) {
		if (always || !userHasScrolled() ||
                currentHeight - div.scrollTop - div.getHeight() <= bottomThreshold) {
			div.scrollTop = currentHeight;
		}
	}

	function autoScroll(always) {
		if (div.scrollHeight > 0) {
			currentHeight = div.scrollHeight;
		} else if (div.offsetHeight > 0) {
			currentHeight = scrollDiv.offsetHeight;
		}

		scrollIfInZone(always);
	}

	// Public (closure-priveleged) methods

	/**
	 * Automatically scrolls the scroll pane depending on whether the user
     * has manually scrolled or not. Alternately, if the always parameter
     * is given, scrolls the scroll pane always.
	 */
	this.autoScroll = function(always) {
		autoScroll(always);
	};

};
