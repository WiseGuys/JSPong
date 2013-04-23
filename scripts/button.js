// button.js
// Bill Derouin
// Button object
// Not much now, but will probably be more
// later when buttons are more complicated
// I mean, look at the menu class :P

// Handles a single button
function button(newMsg) {
	this.x = 0;
	this.y = 0;
	this.msg = newMsg;
	this.width = 75; // make all buttons same width
	this.padding = 5;
	this.height = 10 + this.padding * 2; // 10 font + 5 either side padding
	this.isClicked = 0;
	// In the future: color, image, etc

	this.draw = draw;
	this.clicked = clicked;
	this.load = load;

	function load(newX, newY) {
		this.x = newX;
		this.y = newY;
	}

	function draw(ctx) {
		ctx.font = "10px Arial";
		textDimensions = ctx.measureText(this.msg);

		ctx.fillStyle = "#000";
		ctx.fillRect(this.x - this.padding, this.y - this.padding, this.width + this.padding*2, this.height + this.padding);
		ctx.stroke();

		ctx.fillStyle = "#FFF";
		ctx.fillText(this.msg, this.x + this.width / 2 - textDimensions.width / 2, this.y+this.padding*2); // centered
		ctx.stroke();

		ctx.fillStyle = "#000";

		// To avoid making a new context elsewhere,
		// we'll set the height and width here
		// The button will have to draw
		// before it can be clicked anyways
		//this.width = textDimensions.width + this.padding*2; // 5 either side padding
	}

	function clicked(newX, newY) {
		if (newX > this.x - this.padding && newX < this.x + this.width + this.padding && newY > this.y - this.padding && newY < this.y + this.height + this.padding) {
			this.isClicked = 1;
		}
	}
}