// menu.js
// Bill Derouin
// Menu controller
// Handles main menu so far
// Might do between levels too

// Menu controller
function menu() {
	// Methods
	this.draw = draw;
	this.update = update;
	this.checkClicks = checkClicks;
	this.load = load;

	// Main menu
	this.titleMsg = "JSPong";
	this.message = "Welcome!";
	this.buttonsMain = [];

	// Options menu
	this.optionsMsg = "Options";
	this.buttonsOptions = [];

	// Help menu
	this.helpMsg = "Help";
	this.helpText = "Controls: Use WASD or the arrow keys to control your paddle and press SPACE to serve";
	this.buttonsHelp = [];

	// Single player menu
	this.singleMsg = "Single Player"
	this.singleText = "OH NOES! The bad guys has took the notez. Get em back!";
	this.buttonsSingle = [];

	// Two player menu
	this.twoMsg = "Two Player";
	this.twoText = "Beat your friends!";
	this.buttonsTwo = [];

	function draw() {
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		canvas.width = canvas.width;
		ctx.fillStyle = "#000";

		// See which menu to draw
		switch(stateMenu) {
		case MenuState.MAIN:
			// Title
			ctx.font="30px Arial";
			textDimensions = ctx.measureText(this.titleMsg);
			ctx.fillText(this.titleMsg,WIDTH / 2 - textDimensions.width / 2, 60);

			// Message
			ctx.font="15px Arial";
			textDimensions = ctx.measureText(this.message);
			ctx.fillText(this.message,WIDTH / 2 - textDimensions.width / 2, 200);

			// Buttons
			for (var i=0; i < this.buttonsMain.length; i++) {
				ctx.fillStyle = "#000";
				this.buttonsMain[i].draw(ctx);
			}

			break;
		case MenuState.SINGLE:
			// Title
			ctx.font="30px Arial";
			textDimensions = ctx.measureText(this.singleMsg);
			ctx.fillText(this.singleMsg,WIDTH / 2 - textDimensions.width / 2, 60);

			// Message
			ctx.font="15px Arial";
			textDimensions = ctx.measureText(this.singleText);
			ctx.fillText(this.singleText,WIDTH / 2 - textDimensions.width / 2, 200);

			// Buttons
			for (var i=0; i < this.buttonsSingle.length; i++) {
				ctx.fillStyle = "#000";
				this.buttonsSingle[i].draw(ctx);
			}			
			break;
		case MenuState.TWO:
			// Title
			ctx.font="30px Arial";
			textDimensions = ctx.measureText(this.twoMsg);
			ctx.fillText(this.twoMsg,WIDTH / 2 - textDimensions.width / 2, 60);

			// Message
			ctx.font="15px Arial";
			textDimensions = ctx.measureText(this.twoText);
			ctx.fillText(this.twoText,WIDTH / 2 - textDimensions.width / 2, 200);

			// Buttons
			for (var i=0; i < this.buttonsTwo.length; i++) {
				ctx.fillStyle = "#000";
				this.buttonsTwo[i].draw(ctx);
			}
			break;
		case MenuState.OPTIONS:
			// Title
			ctx.font="30px Arial";
			textDimensions = ctx.measureText(this.optionsMsg);
			ctx.fillText(this.optionsMsg,WIDTH / 2 - textDimensions.width / 2, 60);

			// Buttons
			for (var i=0; i < this.buttonsOptions.length; i++) {
				this.buttonsOptions[i].draw(ctx);
			}

			break;
		case MenuState.HELP:
			// Title
			ctx.font = "30px Arial";
			textDimensions = ctx.measureText(this.helpMsg);
			ctx.fillText(this.helpMsg,WIDTH / 2 - textDimensions.width / 2, 60);

			// Help text
			ctx.font = "15px Arial";
			textDimensions = ctx.measureText(this.helpText);
			ctx.fillText(this.helpText,WIDTH / 2 - textDimensions.width / 2, 200);

			// Buttons
			for (var i=0; i < this.buttonsHelp.length; i++) {
				this.buttonsHelp[i].draw(ctx);
			}
			break;
		}

		// Draw it
		ctx.stroke();
	}

	// Maybe combine this with draw in the future
	function update() {
		// Go thru buttons of current menu
		// see if any are clicked
		switch (stateMenu) {
		case MenuState.MAIN:
			if(this.buttonsMain[this.buttonsMain.indexOf(butSinglePlayer)].isClicked) {
				// Go to single player menu
				stateMenu = MenuState.SINGLE;
				players = 1;
				this.buttonsMain[this.buttonsMain.indexOf(butSinglePlayer)].isClicked = 0;
			} else if(this.buttonsMain[this.buttonsMain.indexOf(butTwoPlayer)].isClicked) {
				// Go to two player menu
				stateMenu = MenuState.TWO;
				players = 2;
				this.buttonsMain[this.buttonsMain.indexOf(butTwoPlayer)].isClicked = 0;
			} else if(this.buttonsMain[this.buttonsMain.indexOf(butOptions)].isClicked) {
				// Go to options menu
				stateMenu = MenuState.OPTIONS;
				this.buttonsMain[this.buttonsMain.indexOf(butOptions)].isClicked = 0;
			} else if(this.buttonsMain[this.buttonsMain.indexOf(butHelp)].isClicked) {
				// Go to help menu
				stateMenu = MenuState.HELP;
				this.buttonsMain[this.buttonsMain.indexOf(butHelp)].isClicked = 0;
			}
			break;
		case MenuState.SINGLE:
			if (this.buttonsSingle[this.buttonsSingle.indexOf(butPlaySingle)].isClicked) {
				// Goto game!
				state = GameState.SINGLE;
				this.buttonsSingle[this.buttonsSingle.indexOf(butPlaySingle)].isClicked = 0;
			}
			break;
		case MenuState.TWO:
			if (this.buttonsTwo[this.buttonsTwo.indexOf(butPlayTwo)].isClicked) {
				// Goto game!
				state = GameState.TWO;
				this.buttonsTwo[this.buttonsTwo.indexOf(butPlayTwo)].isClicked = 0;
			}
			break;
		case MenuState.OPTIONS:
			if(this.buttonsOptions[this.buttonsOptions.indexOf(butBackOptions)].isClicked) {
				// Go back to main menu
				stateMenu = MenuState.MAIN;
				this.buttonsOptions[this.buttonsOptions.indexOf(butBackOptions)].isClicked = 0;
			} else if(this.buttonsOptions[this.buttonsOptions.indexOf(checkMouse)].isClicked) {
				// Set mouse control to active
				mouseControl = !mouseControl;
				setCookie("mouseControl", mouseControl, 30);
				this.buttonsOptions[this.buttonsOptions.indexOf(checkMouse)].isChecked = !this.buttonsOptions[this.buttonsOptions.indexOf(checkMouse)].isChecked;
				this.buttonsOptions[this.buttonsOptions.indexOf(checkMouse)].isClicked = 0;
			}
			break;
		case MenuState.HELP:
			if(this.buttonsHelp[this.buttonsHelp.indexOf(butBackHelp)].isClicked) {
				// Go back to main menu
				stateMenu = MenuState.MAIN;
				this.buttonsHelp[this.buttonsHelp.indexOf(butBackHelp)].isClicked = 0;
			}
			break;
		}
	}

	function checkClicks(mx, my) {
		// Which buttons are depends on menu state
		switch (stateMenu) {
		case MenuState.MAIN:
			for (var i=0; i < this.buttonsMain.length; i++) {
				this.buttonsMain[i].clicked(mx, my); // set clicked buttons to say so, will do something in update()
			}
			break;
		case MenuState.SINGLE:
			for (var i=0; i < this.buttonsSingle.length; i++) {
				this.buttonsSingle[i].clicked(mx, my); // set clicked buttons to say so, will do something in update()
			}
			break;
		case MenuState.TWO:
			for (var i=0; i < this.buttonsTwo.length; i++) {
				this.buttonsTwo[i].clicked(mx, my); // set clicked buttons to say so, will do something in update()
			}
			break;
		case MenuState.OPTIONS:
			for (var i=0; i < this.buttonsOptions.length; i++) {
				this.buttonsOptions[i].clicked(mx, my);
			}
			break;
		case MenuState.HELP:
			for (var i=0; i < this.buttonsHelp.length; i++) {
				this.buttonsHelp[i].clicked(mx, my);
			}
			break;
		}
	}

	function load() {
		// Main menu buttons
		this.buttonsMain.push(butSinglePlayer);
		this.buttonsMain.push(butTwoPlayer);
		this.buttonsMain.push(butOptions);
		this.buttonsMain.push(butHelp);

		for (var i=0; i<this.buttonsMain.length; i++) {
			this.buttonsMain[i].load(WIDTH / 2 - 50 + (i % 2) * 100, Math.floor(i / 2) * 100 + 300);
		}

		// Single player menu
		this.buttonsSingle.push(butPlaySingle);

		for (var i=0; i<this.buttonsSingle.length; i++) {
			this.buttonsSingle[i].load(WIDTH / 2 - 100, i * 100 + 300);
		}

		// Two player menu
		this.buttonsTwo.push(butPlayTwo);

		for (var i=0; i<this.buttonsTwo.length; i++) {
			this.buttonsTwo[i].load(WIDTH / 2 - 100, i * 100 + 300);
		}

		// Options menu
		this.buttonsOptions.push(checkMouse);
		this.buttonsOptions.push(butBackOptions);

		for (var i=0; i<this.buttonsOptions.length; i++) {
			this.buttonsOptions[i].load(WIDTH / 2 - 100, i * 100 + 300);
		}

		// Load options
		mouseControl = getCookie("mouseControl");

		this.buttonsOptions[0].isChecked = mouseControl;

		// Help menu
		this.buttonsHelp.push(butBackHelp);

		for (var i=0; i<this.buttonsHelp.length; i++) {
			this.buttonsHelp[i].load(WIDTH / 2 - 100, i * 100 + 300);
		}
	}
}