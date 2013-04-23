// entities.js
// Bill Derouin
// Combined ball and players into one
// Probably split it up later

// For reference:
// Player1: left player, always human
// Player2: right player, computer in single player

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