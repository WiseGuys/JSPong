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
var albert = new ai("smart");

// Buttons
var butSinglePlayer = new button("Single Player");
var butTwoPlayer = new button("Two Player");
var butOptions = new button("Options");
var butHelp = new button("Help");

var butBackOptions = new button("Back");
var butBackHelp = new button("Back");
var butPlaySingle = new button("Play");
var butPlayTwo = new button("Play");

var checkMouse = new checkbox("Mouse control");

// Levels
var levelOne = new level("Brahms Waltz in Ab", "Help save this song from the bad guys", "Congrats, you win!", [C5, Ab4, Ab4, C5, C5, Ab4, Ab4, C5, Db5, Eb5, Db5, C5, Bb4, C5], "folo");
var levelTwo = new level("Dark Horse", "Not Nickelback", "Still not Nickelback", [C5, Bb4], "halfolo");

var levels = [levelOne, levelTwo];

// Start the game!
function loadGame() {
	GameController.load();
}

// Handles clicks straight from canvas element
function clickEvent() {
    var mouseLoc = getMouse();

    menuController.checkClicks(mouseLoc._mx, mouseLoc._my);
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