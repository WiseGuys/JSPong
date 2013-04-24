// globals.js
// Bill Derouin
// Contains global variables
// The ones that don't require any other code
// To help load value

// Constants
var SPEED_PLAYER = 15;
var WIDTH_PLAYER = 8;
var HEIGHT_PLAYER = 50;
var RADIUS_BALL = 5;
var PLAYER_BUFFER = 50;

var WIDTH = 1280;
var HEIGHT = 720;

var playing = 1; // of course we're playing!
var players = 1;

// For smart AI
var ballHitY = 0;
var ballHitX = 0;

// Things related to score
var score1 = 0;
var score2 = 0;
var twoScored = 0;

// Game states
var GameState = {
	LOAD: 0, // loading before main menu
	MENU: 1, // main menu
	SINGLE: 2,
	TWO: 3,
	PAUSE: 4, // paused, not implemented yet
	RESET: 5, // after a score or at beginning
	GAMEOVER: 6, // self-explanatory
	PLAY: 7
};

var state = GameState.LOAD;

// Menu states 
var MenuState = {
	MAIN: 0,
	SINGLE: 1,
	TWO: 2,
	OPTIONS: 3,
	HELP: 4,
	EXIT: 5
};

var stateMenu = MenuState.MAIN;

// General sounds
var scoreSound = new Audio("sounds/score.wav");
var pointLostSound = new Audio("sounds/pointlost.wav");

// Bounce sounds
/*var C2a = new Audio("sounds/C2a.wav");
var Ab1a = new Audio("sounds/Ab1a.wav");
*/

// Levels sounds
var C5a = new Audio("sounds/C5a.wav");
var C5b = new Audio("sounds/C5b.wav");
var C5 = [C5a, C5b];

var Ab4a = new Audio("sounds/Ab4a.wav");
var Ab4b = new Audio("sounds/Ab4b.wav");
var Ab4 = [Ab4a, Ab4b];

var Db5a = new Audio("sounds/Db5a.wav");
var Db5b = new Audio("sounds/Db5b.wav");
var Db5 = [Db5a, Db5b];

var Eb5a = new Audio("sounds/Eb5a.wav");
var Eb5b = new Audio("sounds/Eb5b.wav");
var Eb5 = [Eb5a, Eb5b];

var Bb4a = new Audio("sounds/Bb4a.wav");
var Bb4b = new Audio("sounds/Bb4b.wav");
var Bb4 = [Bb4a, Bb4b];

var sounds = [C5, Ab4, Ab4, C5, C5, Ab4, Ab4, C5, Db5, Eb5, Db5, C5, Bb4, C5];
var currentSound = 0;
var maxSound = sounds.length;

// Background music
var musicOneA = new Audio("sounds/bg1a.wav");
musicOneA.volume = 0.3;
musicOneA.loop = true;
var musicOneB = new Audio("sounds/bg1b.wav");
musicOneB.volume = 0.3;
musicOneB.loop = true;
var musicOne = [musicOneA, musicOneB];

console.log(musicOne);

// Levels
var curLevel = 0;
var successLevel = 0;

// Key controller stuff
var Key = {
    _pressed: {},

    // Keycodes: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27,
    W: 87,
    S: 83,
    SPACE: 32,
    ENTER: 13,
          
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
         
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
          
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

// Options
var mouseControl = 0;

// Mouse position
var mouseLoc = 0;
function getMouse() {
    // Handle offset canvas has from window
    var c=document.getElementById("canvas");
    var offset = getOffset(c);

    var mx = event.clientX - offset.left;
    var my = event.clientY - offset.top;

    mouseLoc = { _mx: mx, _my: my };
    return mouseLoc;
}

// Cookies
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}