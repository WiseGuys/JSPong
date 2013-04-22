// game.js
// Bill Derouin
// Game controller
// Handles main game loop and stuff

// Game controller
function Game() {
	this.load = load;
	this.begin = begin;
	this.update = update;
	this.draw = draw;

	function load() {
		gameBall.load(WIDTH/2, HEIGHT/2); // Init ball
		firstPlayer.load(PLAYER_BUFFER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init left player
		secondPlayer.load(WIDTH - PLAYER_BUFFER - WIDTH_PLAYER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init right player

		menuController.load();

		this.begin();
	}

	function begin() {
		// Start the framerate controller
		_intervalId = setInterval(main, 1000 / 50);  // 2nd num is fps
		state = GameState.MENU;
	}

	function main() {

		if (playing) {
			// Gamestate switch
			switch(state) {
			case GameState.LOAD:
				// Should already be loaded, maybe a loading screen later
				break;
			case GameState.MENU:
				menuController.draw();
				menuController.update();
				break;
			case GameState.RESET:
				resetController.update();
				resetController.draw();
				break;
			case GameState.SINGLE:
				state = GameState.RESET;
				break;
			case GameState.TWO:
				state = GameState.RESET;
				break;
			case GameState.PLAY:
				update();
				draw();
				break;
			}
		} else {
			// End interval, look up later
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
			if (isPlaying(sounds[currentSound][successLevel])) {
				restartSound(sounds[currentSound][successLevel]);
			} else {
				sounds[currentSound][successLevel].play();
			}
			currentSound += 1;
			if (currentSound >= maxSound) {
				currentSound = 0;
			}

			// Make sure it's within the bounds
			if (gameBall.y < 0) {
				gameBall.y = 0;
			}

			if (gameBall.y > HEIGHT) {
				gameBall.y = HEIGHT;
			}
		}

		// Ball bounce off paddles
		if (gameBall.x >= WIDTH - PLAYER_BUFFER - WIDTH_PLAYER && gameBall.x <= WIDTH - PLAYER_BUFFER + WIDTH_PLAYER) {
			// On right side
			// Need to improve this check later
			// It skips out when going fast
			// Perhaps increase the threshold when checking win case
			if (gameBall.y >= secondPlayer.y && gameBall.y <= secondPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel -= 1.5;
				gameBall.yVel += (gameBall.y - (secondPlayer.y + HEIGHT_PLAYER) / 2) / 40;
				if (isPlaying(sounds[currentSound][successLevel])) {
					restartSound(sounds[currentSound][successLevel]);
				} else {
					sounds[currentSound][successLevel].play();
				}
				currentSound += 1;
				if (currentSound >= maxSound) {
					currentSound = 0;
				}
			}
		}

		if (gameBall.x <= PLAYER_BUFFER + WIDTH_PLAYER && gameBall.x >= PLAYER_BUFFER - WIDTH_PLAYER) {
			// On left side
			if (gameBall.y >= firstPlayer.y && gameBall.y <= firstPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel += 1.5;
				gameBall.yVel = (gameBall.y - (firstPlayer.y + HEIGHT_PLAYER) / 2) / 40;
				if (isPlaying(sounds[currentSound][successLevel])) {
					restartSound(sounds[currentSound][successLevel]);
				} else {
					sounds[currentSound][successLevel].play();
				}
				currentSound += 1;
				if (currentSound >= maxSound) {
					currentSound = 0;
				}
			}
		}

		// Quit?
		if (Key.isDown(Key.ESC)) playing = 0;		

		// Puntos
		if (gameBall.x > WIDTH) {
			// Point player1 (good)
			score1 += 1;
			twoScored = 0;
			scoreSound.play();
			state = GameState.RESET;
			successLevel += 1;
			if (successLevel > 1) {
				successLevel = 1;
			}
			resetController.load();
		}

		if (gameBall.x < 0) {
			score2 += 1;
			twoScored = 1;
			pointLostSound.play();
			state = GameState.RESET;
			successLevel -= 1;
			if (successLevel < 0) {
				successLevel = 0;
			}
			resetController.load();
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