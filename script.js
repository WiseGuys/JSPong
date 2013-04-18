// Global variables
var GameController = new Game();
var gameBall = new ball(0, 0);
var firstPlayer = new player1(0, 0);
var secondPlayer = new player2(0, 0);

var SPEED_PLAYER = 10;
var WIDTH_PLAYER = 5;
var HEIGHT_PLAYER = 200;
var RADIUS_BALL = 5;

var playing = 1; // of course we're playing!

var score1 = 0;
var score2 = 0;

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

// Start the game!
function loadGame() {
	GameController.load();
}

// Game controller
function Game() {
	this.load = load;
	this.begin = begin;

	function load() {
		gameBall.load(640, 360); // Init ball
		firstPlayer.load(5, 360); // Init left player
		secondPlayer.load(1270, 360); // Init right player

		this.begin();
	}

	function begin() {
		// Start the framerate controller
		_intervalId = setInterval(main, 1000 / 50);  // 2nd num is fps
	}

	function main() {
		if (playing) {
			// Main loop, woohoo
			update();
			draw();
		} else {
			// End interval (find this online)
		}
	}

	function update() {
		// Player 1
		if (Key.isDown(Key.W)) firstPlayer.y -= SPEED_PLAYER;
		if (Key.isDown(Key.S)) firstPlayer.y += SPEED_PLAYER;

		// Player 2
		if (Key.isDown(Key.UP)) secondPlayer.y -= SPEED_PLAYER;
		if (Key.isDown(Key.DOWN)) secondPlayer.y += SPEED_PLAYER;

		// Ball movement
		gameBall.x += gameBall.xVel;
		gameBall.y += gameBall.yVel;

		// Ball bounce off walls
		if (gameBall.y <= 0 || gameBall.y > 720) {
			gameBall.yVel *= -1;
		}

		// Ball bounce off paddles
		if (gameBall.x >= 1270) {
			// On right side
			// Need to improve this check later
			// It skips out when going fast
			// Perhaps increase the threshold when checking win case
			if (gameBall.y >= secondPlayer.y && gameBall.y <= secondPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel -= 1;
			}
		}

		if (gameBall.x <= 10) {
			// On left side
			if (gameBall.y >= firstPlayer.y && gameBall.y <= firstPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel += 1;
			}
		}

		// Quit?
		if (Key.isDown(Key.ESC)) playing = 0;

		// Start game
		if (Key.isDown(Key.SPACE)) {
			gameBall.xVel = 2;
			gameBall.yVel = -2;
		}

		// Puntos
		if (gameBall.x > 1290) {
			// Point player1
			score1 += 1;
			gameBall.load(640, 360);
		}

		if (gameBall.x < -10) {
			score2 += 1;
			gameBall.load(640, 360);
		}
	}

	function draw() {
    	var c=document.getElementById("canvas");
    	var ctx=c.getContext("2d");
    	canvas.width = canvas.width; // clear screen
    	ctx.fillStyle="#000";

    	// Player 1
    	ctx.fillRect(firstPlayer.x,firstPlayer.y,WIDTH_PLAYER,HEIGHT_PLAYER);

    	// Player 2
    	ctx.fillRect(secondPlayer.x, secondPlayer.y, WIDTH_PLAYER, HEIGHT_PLAYER);

    	// Ball
    	ctx.arc(gameBall.x,gameBall.y,RADIUS_BALL,0,2*Math.PI);    	

    	// Middle line
    	ctx.moveTo(640, 0);
    	ctx.lineTo(640, 720);

    	// Scores
    	ctx.font="30px Arial";
    	ctx.fillText(score1,600,25);
    	ctx.fillText(score2,660,25);

    	// Draw it
    	ctx.stroke();
    }
}

// Ball controller
function ball(newX, newY) {
	this.x = newX;
	this.y = newY;
	this.xVel = 0;
	this.yVel = 0;
	this.load = load;

	function load(newX, newY) {
		this.x = newX;
		this.y = newY;
		this.xVel = 0;
		this.yVel = 0;
	}
}

// Left player controller
function player1(newX, newY) {
	this.x = newX;
	this.y = newY;
	this.load = load;

	function load(newX, newY) {
		this.x = newX;
		this.y = newY;
	}
}

// Right player controller
function player2(newX, newY) {
	this.x = newX;
	this.y = newY;
	this.load = load;

	function load(newX, newY) {
		this.x = newX;
		this.y = newY;
	}
}