// reset.js
// Bill Derouin
// Reset controller
// Handles resetting the ball
// Not much now, but more advanced
// things are in the works
// Similar to game controller, but at reset

// Manages game resets, at beginning and at scores
function reset() {
	this.load = load;
	this.draw = draw;
	this.update = update;
	this.manageSuccess = manageSuccess;

	function load() {
		gameBall.load(WIDTH / 2, Math.floor(Math.random() * 401) + HEIGHT / 4);
		ballHitY = gameBall.y;
		ballHitX = gameBall.x;
		firstPlayer.load(PLAYER_BUFFER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init left player
		secondPlayer.load(WIDTH - PLAYER_BUFFER - WIDTH_PLAYER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init right player
	}

	function update() {
		// Quit?
		if (Key.isDown(Key.ESC)) playing = 0;

		//this.manageSuccess();

		// Start game
		if (Key.isDown(Key.SPACE)) {
			state = GameState.PLAY;

			// Randomized starting velocities
			gameBall.xVel = Math.floor(Math.random()*5) + 3;
			gameBall.yVel = Math.floor(Math.random()*3) + 1;

			if (twoScored) {
				// If player two scored, then start the ball going the other way (winner takes it)
				gameBall.xVel *= -1;
				gameBall.yVel *= -1;
			}

			// Restart current sound for combo
			currentSound = 0;
		}
	}

	function draw() {
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
    	if (players == 1) {
    		ctx.fillText(successLevel, WIDTH / 2, 25);
    	} else {
    		ctx.fillText(score1,600,25);
    		ctx.fillText(score2,660,25);
		}

    	// Instructions
    	ctx.font="15px Arial";
    	textDimensions = ctx.measureText("Press space to begin");
    	ctx.fillText("Press space to begin", WIDTH / 2 - textDimensions.width / 2, HEIGHT - 100);

    	// Draw it
    	ctx.stroke();
	}

	function manageSuccess() {
		console.log("manage");
		if (players == 1) {
			if (successLevel < maxLevel) {
				// Manage success level
				if (successLevel < 0) successLevel = 0;
			} else {
				console.log("win");
				// Beat the level!
				state = GameState.GAMEOVER;

				// Stop current music, start victory music!
				bgMusic[curLevel][successLevel-1].pause(); // last successlevel
				victoryMusic[curLevel].play();

				successLevel--; // help with GameState.SINGLE
			}
		}
	}
}