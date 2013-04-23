// main.js
// Bill Derouin
// Contains constants and global vars
// Also has some auxilary functions

// Global variables
var GameController = new Game();
var gameBall = new ball(0, 0);
var firstPlayer = new player1(0, 0);
var secondPlayer = new player2(0, 0);
var menuController = new menu();
var resetController = new reset();

// Buttons
var butSinglePlayer = new button(WIDTH / 2, HEIGHT / 2 - 100, "Single Player");
var butTwoPlayer = new button(WIDTH / 2, HEIGHT / 2, "Two Player");
var butOptions = new button(WIDTH / 2, HEIGHT  / 2 + 100, "Options");
var butHelp = new button(WIDTH / 2, HEIGHT / 2 + 200, "Help");

var butBack = new button(WIDTH / 2, HEIGHT / 2, "Back");
var butPlay = new button(WIDTH / 2, HEIGHT / 2, "Play");

// Levels
var levelOne = new level("Brahms Waltz in Ab", "Help save this song from the bad guys", "Congrats, you win!", [C5, Ab4, Ab4, C5, C5, Ab4, Ab4, C5, Db5, Eb5, Db5, C5, Bb4, C5]);
var levelTwo = new level("Dark Horse", "Not Nickelback", "Still not Nickelback", [C5, Bb4]);

var levels = [levelOne, levelTwo];

// Start the game!
function loadGame() {
	GameController.load();
}

// Handles clicks straight from canvas element
function clickEvent() {
	// Handle offset canvas has from window
	var c=document.getElementById("canvas");
    var offset = getOffset(c);

    var mx = event.clientX - offset.left;
    var my = event.clientY - offset.top;

    menuController.checkClicks(mx, my);
}

// Prevent arrow key and WASD scrolling
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40, 87, 65, 83, 68].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Check if sound is playing
function isPlaying(audelem) { 
	return !audelem.paused; 
}

// Restart the sound in order to avoid missing one
function restartSound(sound) {
    try {
        sound.currentTime = 0;
    } catch (e) {
        // Fail silently but show in F12 developer tools console
        if(window.console && console.error("Error:" + e));
    }
}

// Get offset of canvas from window
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}