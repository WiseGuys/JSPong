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
	this.pauseMenu = pauseMenu;

	function load() {
		gameBall.load(WIDTH/2, HEIGHT/2); // Init ball
		firstPlayer.load(PLAYER_BUFFER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init left player
		secondPlayer.load(WIDTH - PLAYER_BUFFER - WIDTH_PLAYER, HEIGHT / 2 - HEIGHT_PLAYER / 2); // Init right player

		menuController.load();

		albert.load();

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
				// Single player menu screen
				// Menu controller single player would be level select

				// Load level
				sounds = levels[curLevel].sounds;
				maxSound = levels[curLevel].maxSounds;
				currentSound = 0;
				albert.setPers(levels[curLevel].aiPersonality);
				maxLevel = levels[curLevel].goal;

				// Stop old music
				if (curLevel > 0) bgMusic[curLevel - 1][successLevel].pause();

				// Reset score
				successLevel = 0;
				score1 = 0;
				score2 = 0;

				// bg music (has to go after successLevel is reset)
				bgMusic[curLevel][successLevel].play();

				// Draw page
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				canvas.width = canvas.width;
				ctx.fillStyle = "#000";
				
				// Title
				ctx.font="30px Arial";
				var textDimensions = ctx.measureText(levels[curLevel].name);
				ctx.fillText(levels[curLevel].name,WIDTH / 2 - textDimensions.width / 2, 60);

				// Message
				ctx.font="15px Arial";
				textDimensions = ctx.measureText(levels[curLevel].text);
				ctx.fillText(levels[curLevel].text,WIDTH / 2 - textDimensions.width / 2, 200);

				// Press Enter to play
				ctx.font="15px Arial";
				textDimensions = ctx.measureText("Press Enter to play");
				ctx.fillText("Press Enter to play",WIDTH / 2 - textDimensions.width / 2, 300);

				// Go to game
				if (Key.isDown(Key.ENTER)) {
					state = GameState.RESET;
					resetController.load();
				}
				break;
			case GameState.TWO:
				bgMusic[curLevel][successLevel].play();
				state = GameState.RESET;
				resetController.load();
				break;
			case GameState.PLAY:
				update();
				draw();
				break;
			case GameState.PAUSE:
				pauseMenu();
				break;
			case GameState.GAMEOVER:
				if (curLevel >= finalLevel) { // full success
					bgMusic[curLevel-1][successLevel].pause();
					victorySound.play();

					var c = document.getElementById("canvas");
					var ctx = c.getContext("2d");
					canvas.width = canvas.width;
					ctx.fillStyle = "#000";
					
					// Title
					ctx.font="30px Arial";
					var textDimensions = ctx.measureText("You win");
					ctx.fillText("You win",WIDTH / 2 - textDimensions.width / 2, 60);

					// Text
					ctx.font = "15px Arial";
					textDimensions = ctx.measureText("Press enter to go back to the main menu");
					ctx.fillText("Press enter to go back to the main menu",WIDTH / 2 - textDimensions.width / 2, HEIGHT / 2);

					if (Key.isDown(Key.ENTER)) {
						state = GameState.MENU;
						stateMenu = MenuState.MAIN;

						// Reset everything
						curLevel = 0;
						successLevel = 0;
					}
				} else {
					bgMusic[curLevel][successLevel].pause();
					// Success!
					// Draw page
					var c = document.getElementById("canvas");
					var ctx = c.getContext("2d");
					canvas.width = canvas.width;
					ctx.fillStyle = "#000";
					
					// Title
					ctx.font="30px Arial";
					var textDimensions = ctx.measureText(levels[curLevel].name);
					ctx.fillText(levels[curLevel].name,WIDTH / 2 - textDimensions.width / 2, 60);

					// Message
					ctx.font="15px Arial";
					textDimensions = ctx.measureText(levels[curLevel].victory);
					ctx.fillText(levels[curLevel].victory,WIDTH / 2 - textDimensions.width / 2, 200);

					// Continue
					ctx.font="15px Arial";
					textDimensions = ctx.measureText("Press Space to continue");
					ctx.fillText("Press Space to continue",WIDTH / 2 - textDimensions.width / 2, 300);

					if (Key.isDown(Key.SPACE)) {
						victoryMusic[curLevel].pause();
						curLevel++;
						if (curLevel < finalLevel) {
							state = GameState.SINGLE;
						}
					}
					break;
				}
			}
		} else {
			// End interval, look up later
		}
	}

	function update() {
		// Player 1
		if (Key.isDown(Key.W) && firstPlayer.y > 0) firstPlayer.y -= SPEED_PLAYER;
		if (Key.isDown(Key.S) && firstPlayer.y < HEIGHT-HEIGHT_PLAYER) firstPlayer.y += SPEED_PLAYER;

		// Mouse control for Player 1
		if (mouseControl) {
			//firstPlayer.y = mouseLoc._my;
			var middle = firstPlayer.y + HEIGHT_PLAYER / 2;
			if (Math.abs(middle - mouseLoc._my) < SPEED_PLAYER) {
				if (mouseLoc._my > middle) firstPlayer.y += Math.abs(middle - mouseLoc._my);
				else if (mouseLoc._my < middle) firstPlayer.y -= Math.abs(middle - mouseLoc._my);
			} else if (mouseLoc._my > middle) { 
				firstPlayer.y += SPEED_PLAYER;
			} else if (mouseLoc._my < middle) {
				firstPlayer.y -= SPEED_PLAYER;
			}
		}

		// Player 2
		if (players == 2) {
			if (Key.isDown(Key.UP) && secondPlayer.y > 0) secondPlayer.y -= SPEED_PLAYER;
			if (Key.isDown(Key.DOWN) && secondPlayer.y < HEIGHT-HEIGHT_PLAYER) secondPlayer.y += SPEED_PLAYER;
		} else {
			albert.update();
		}

		// Ball movement
		if (gameBall.yVel > 6) {
			gameBall.yVel = 6;
		}
		gameBall.x += gameBall.xVel;
		gameBall.y += gameBall.yVel;

		// Ball bounce off walls
		if (gameBall.y <= 0 || gameBall.y > HEIGHT) {
			gameBall.yVel *= -1;
			// Only one sound playing at a time
			if (currentSound > 0) {
				if (isPlaying(sounds[currentSound-1][successLevel])) {
					sounds[currentSound-1][successLevel].volume = 0.0;
				}
			} else {
				if (isPlaying(sounds[maxSound-1][successLevel])) {
					sounds[maxSound-1][successLevel].volume = 0.0;
				}
			}
			if (isPlaying(sounds[currentSound][successLevel])) {
				restartSound(sounds[currentSound][successLevel]);
			} else {
				sounds[currentSound][successLevel].volume = 1.0;
				sounds[currentSound][successLevel].play();
			}
			
			currentSound += 1;
			if (currentSound >= maxSound) {
				// C-C-C-Combo BREAKER
				currentSound = 0;
				if (players == 1) {
					score1 += 1;
					if (successLevel < maxLevel-1) successLevel++;
				}
				//resetController.manageSuccess();
				var curTime = bgMusic[curLevel][successLevel].currentTime;
				if (successLevel < maxLevel) {
					bgMusic[curLevel][successLevel-1].pause();
					bgMusic[curLevel][successLevel].currentTime = curTime;
					bgMusic[curLevel][successLevel].play();
				}
				
			}

			// Make sure it's within the bounds
			if (gameBall.y < 0) {
				gameBall.y = 0;
			}

			if (gameBall.y > HEIGHT) {
				gameBall.y = HEIGHT;
			}

			ballHitY = gameBall.y;
			ballHitX = gameBall.x;
		}

		// Ball bounce off paddles
		if (gameBall.x >= WIDTH - PLAYER_BUFFER - WIDTH_PLAYER - gameBall.xVel && gameBall.x <= WIDTH - PLAYER_BUFFER + WIDTH_PLAYER + gameBall.xVel) {
			// On right side
			// Need to improve this check later
			// It skips out when going fast
			// Perhaps increase the threshold when checking win case
			if (gameBall.y >= secondPlayer.y && gameBall.y <= secondPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel -= 1.5;
				gameBall.yVel += (gameBall.y - (secondPlayer.y + HEIGHT_PLAYER) / 2) / 40;
				if (currentSound > 0) {
					if (isPlaying(sounds[currentSound-1][successLevel])) {
						sounds[currentSound-1][successLevel].volume = 0.0;
					}
				} else {
					if (isPlaying(sounds[maxSound-1][successLevel])) {
						sounds[maxSound-1][successLevel].volume = 0.0;
					}
				}
				if (isPlaying(sounds[currentSound][successLevel])) {
					restartSound(sounds[currentSound][successLevel]);
				} else {
					sounds[currentSound][successLevel].volume = 1.0;
					sounds[currentSound][successLevel].play();
				}
				
				currentSound += 1;
				if (currentSound >= maxSound) {
					currentSound = 0;
					// C-C-C-Combo breaker
					if (players == 1) {
						score1 += 1;
						if (successLevel < maxLevel-1) successLevel++;
					}
					//resetController.manageSuccess();
					var curTime = bgMusic[curLevel][successLevel].currentTime;
					if (successLevel < maxLevel) {
						bgMusic[curLevel][successLevel-1].pause();
						bgMusic[curLevel][successLevel].currentTime = curTime;
						bgMusic[curLevel][successLevel].play();
					}
				}
				// for smart AI
				ballHitY = gameBall.y;
				ballHitX = gameBall.x;
			}
		}

		if (gameBall.x <= PLAYER_BUFFER + WIDTH_PLAYER - gameBall.xVel && gameBall.x >= PLAYER_BUFFER - WIDTH_PLAYER + gameBall.xVel) { // xVel is neg moving to left
			// On left side
			if (gameBall.y >= firstPlayer.y && gameBall.y <= firstPlayer.y + HEIGHT_PLAYER) {
				gameBall.xVel *= -1;
				gameBall.xVel += 1.5;
				gameBall.yVel = (gameBall.y - (firstPlayer.y + HEIGHT_PLAYER) / 2) / 40;
				if (currentSound > 0) {
					if (isPlaying(sounds[currentSound-1][successLevel])) {
						sounds[currentSound-1][successLevel].volume = 0.0;
					}
				} else {
					if (isPlaying(sounds[maxSound-1][successLevel])) {
						sounds[maxSound-1][successLevel].volume = 0.0;
					}
				}
				if (isPlaying(sounds[currentSound][successLevel])) {
					restartSound(sounds[currentSound][successLevel]);
				} else {
					sounds[currentSound][successLevel].volume = 1.0;
					sounds[currentSound][successLevel].play();
				}
				
				currentSound += 1;
				if (currentSound >= maxSound) {
					currentSound = 0;
					// C-C-C-Combo breaker
					if (players == 1) {
						score1 += 1;
						if (successLevel < maxLevel-1) successLevel++;
					}
					//resetController.manageSuccess();
					// BG music level up
					var curTime = bgMusic[curLevel][successLevel].currentTime;
					if (successLevel < maxLevel) {
						bgMusic[curLevel][successLevel-1].pause();
						bgMusic[curLevel][successLevel].currentTime = curTime;
						bgMusic[curLevel][successLevel].play();
					} else {
						state = GameState.GAMEOVER;
					}
				}
				ballHitY = gameBall.y;
				ballHitX = gameBall.x;
			}
		}

		// Quit?
		if (Key.isDown(Key.ESC)) state = GameState.PAUSE;

		// Puntos
		if (gameBall.x > WIDTH) {
			if (players == 1) {
				// Point player1 (good)
				if (successLevel < maxLevel) successLevel++;
				scoreSound.play();				

				// BG music level up
				var curTime = bgMusic[curLevel][successLevel-1].currentTime;
				if (successLevel < maxLevel) {
					bgMusic[curLevel][successLevel-1].pause();
					bgMusic[curLevel][successLevel].currentTime = curTime;
					bgMusic[curLevel][successLevel].play();
				}
			} else {
				score1 += 1;
			}
			twoScored = 0;
			state = GameState.RESET;
			resetController.manageSuccess();
			resetController.load();
		}

		if (gameBall.x < 0) {
			if (players == 1) {				
				if (successLevel > 0) successLevel--;				
				pointLostSound.play();

				// BG music level down
				if (successLevel > 0) {
					var curTime = bgMusic[curLevel][successLevel-1].currentTime;
					bgMusic[curLevel][successLevel+1].pause();
					bgMusic[curLevel][successLevel].currentTime = curTime;
					bgMusic[curLevel][successLevel].play();
				}
			} else {
				score2 += 1;
			}
			twoScored = 1;
			state = GameState.RESET;
			resetController.manageSuccess();
			resetController.load();
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

    	// Draw it
    	ctx.stroke();
    }

    function pauseMenu() {
    	ctx.fillStyle="#000";

    	// Box in middle
    	ctx.fillRect(WIDTH / 4, HEIGHT / 4, WIDTH / 2, HEIGHT / 2);

    	// Text
    	ctx.fillStyle = "#FFF";
    	ctx.font = "40px Arial";
    	var pauseText = "PAUSED, hit space to continue";
    	var dimensions = ctx.measureText(pauseText);
    	ctx.fillText(pauseText, WIDTH / 2 - dimensions.width / 2, HEIGHT / 2);

    	// More text
    	ctx.font = "20px Arial";
    	var pauseText = "Hit Enter to go back to the main menu";
    	var dimensions = ctx.measureText(pauseText);
    	ctx.fillText(pauseText, WIDTH / 2 - dimensions.width / 2, HEIGHT / 2 + 150);

    	if (Key.isDown(Key.SPACE)) state = GameState.PLAY;
    	if (Key.isDown(Key.ENTER)) {
    		state = GameState.MENU;
    		stateMenu = MenuState.MAIN;
    		bgMusic[curLevel][successLevel].pause();
    		bgMusic[curLevel][successLevel].currentTime = 0;
    	}
    }
}