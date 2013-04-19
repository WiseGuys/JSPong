// Global variables
var GameController = new Game();
var gameBall = new ball(0, 0);
var firstPlayer = new player1(0, 0);
var secondPlayer = new player2(0, 0);

// Constants
var SPEED_PLAYER = 15;
var WIDTH_PLAYER = 5;
var HEIGHT_PLAYER = 50;
var RADIUS_BALL = 5;
var PLAYER_BUFFER = 50;

var WIDTH = 1280;
var HEIGHT = 720;

var playing = 1; // of course we're playing!

// Things related to score
var score1 = 0;
var score2 = 0;
var twoScored = 0;

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
		gameBall.load(WIDTH/2, HEIGHT/2); // Init ball
		firstPlayer.load(PLAYER_BUFFER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init left player
		secondPlayer.load(WIDTH - PLAYER_BUFFER - WIDTH_PLAYER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init right player

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
		if (Key.isDown(Key.W) && firstPlayer.y > 0) firstPlayer.y -= SPEED_PLAYER;
		if (Key.isDown(Key.S) && firstPlayer.y < HEIGHT-HEIGHT_PLAYER) firstPlayer.y += SPEED_PLAYER;

		// Player 2
		if (Key.isDown(Key.UP) && secondPlayer.y > 0) secondPlayer.y -= SPEED_PLAYER;
		if (Key.isDown(Key.DOWN) && secondPlayer.y < HEIGHT-HEIGHT_PLAYER) secondPlayer.y += SPEED_PLAYER;

		// Ball movement
		if (gameBall.yVel > 4) {
			gameBall.yVel = 4;
		}
		gameBall.x += gameBall.xVel;
		gameBall.y += gameBall.yVel;

		// Ball bounce off walls
		if (gameBall.y <= 0 || gameBall.y > HEIGHT) {
			gameBall.yVel *= -1;
		}

		// Ball bounce off paddles
		if (gameBall.x >= WIDTH - PLAYER_BUFFER - WIDTH_PLAYER) {
			// On right side
			// Need to improve this check later
			// It skips out when going fast
			// Perhaps increase the threshold when checking win case
			if (gameBall.y >= secondPlayer.y && gameBall.y <= secondPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel -= 1.5;
				gameBall.yVel += (gameBall.y - (secondPlayer.y + HEIGHT_PLAYER) / 2) / 40;
			}
		}

		if (gameBall.x <= PLAYER_BUFFER + WIDTH_PLAYER) {
			// On left side
			if (gameBall.y >= firstPlayer.y && gameBall.y <= firstPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel += 1.5;
				gameBall.yVel = (gameBall.y - (firstPlayer.y + HEIGHT_PLAYER) / 2) / 40;
			}
		}

		// Quit?
		if (Key.isDown(Key.ESC)) playing = 0;

		// Start game
		if (Key.isDown(Key.SPACE)) {

			// Randomized starting velocities
			gameBall.xVel = Math.floor(Math.random()*5) + 3;
			gameBall.yVel = Math.floor(Math.random()*3) + 1;

			if (twoScored) {
				// If player two scored, then start the ball going the other way (winner takes it)
				gameBall.xVel *= -1;
				gameBall.yVel *= -1;
			}
		}

		// Puntos
		if (gameBall.x > WIDTH) {
			// Point player1
			score1 += 1;
			twoScored = 0;
			gameBall.load(WIDTH / 2, Math.floor(Math.random() * 401) + 160); // Random middle 400
		}

		if (gameBall.x < 0) {
			score2 += 1;
			twoScored = 1;
			gameBall.load(WIDTH / 2, Math.floor(Math.random() * 401) + 160);
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
    	ctx.moveTo(WIDTH / 2, 0);
    	ctx.lineTo(WIDTH / 2, HEIGHT);

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