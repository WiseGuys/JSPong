// ai.js
// Handles the artificial intelligence in single player game mode
// Called when player2 is updated

// Needs to be loaded after ball and player2

function ai(pers) {
	// The personality is the ai's behavior
	// Personalities:
	// - Always follows, but slow (folo)
	// - Follows after ball passes half, faster; walks to center when not (halfolo)
	// - Predicts where the ball will go (smart)
	this.personality = pers;
	this.speed = 0; // speed is dependent on personality

	this.load = load;
	this.update = update;

	function load() {
		switch (this.personality) {
		case "folo":
			this.speed = 3;
			break;
		case "halfolo":
			this.speed = 6;
			break;
		case "smart":
			this.speed = 10;
			break;
		}
	}

	function update() {
		var middle = secondPlayer.y + HEIGHT_PLAYER / 2
		switch (this.personality) {
		case "folo": // always follows, but slow
			// If it's close enough, jump straight to it
			if (middle > gameBall.y) {
				if (Math.abs(middle - gameBall.y) <= this.speed) {
					secondPlayer.y -= Math.abs(middle - gameBall.y);
				} else {
					secondPlayer.y -= this.speed;
				}
			} else if (middle < gameBall.y) {
				if (Math.abs(middle - gameBall.y) <= this.speed) {
					secondPlayer.y += Math.abs(middle - gameBall.y);
				} else {
					secondPlayer.y += this.speed;
				}
			}
			break;
		case "halfolo":	
			if (gameBall.x > WIDTH / 2 && gameBall.xVel > 0) {
				if (Math.abs(middle - gameBall.y) < 5) {
					return;
				}
				if (middle > gameBall.y) {
					if (middle - gameBall.y <= this.speed) {
						secondPlayer.y -= middle - gameBall.y
					}
					secondPlayer.y -= this.speed;
				} else if (middle < gameBall.y) {
					secondPlayer.y += this.speed;
				}
			} else {
				if (Math.abs(middle - HEIGHT / 2) < 25) {
					return;
				}
				if (secondPlayer.y > HEIGHT / 2) {
					secondPlayer.y -= 2;
				} else if (secondPlayer.y < HEIGHT / 2) {
					secondPlayer.y += 2;
				}
			}
			break;
		case "smart":
			if (gameBall.xVel > 0) {
				var slope = gameBall.yVel / gameBall.xVel;
				var future = slope * (WIDTH - PLAYER_BUFFER - WIDTH_PLAYER - ballHitX) + ballHitY; // y = mx + b
				console.log(future);
				if (Math.abs(middle - future) < this.speed) {
					if (middle > future) secondPlayer.y -= Math.abs(middle - future);
					else if (middle < future) secondPlayer.y += Math.abs(middle - future);
				} else {
					if (middle > future && secondPlayer.y > 0) secondPlayer.y -= this.speed;
					else if (middle < future && secondPlayer.y + HEIGHT_PLAYER < HEIGHT) secondPlayer.y += this.speed;
				}
			}
			break;
		}
	}
}