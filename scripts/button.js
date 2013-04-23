// button.js
// Bill Derouin
// Button object
// Not much now, but will probably be more
// later when buttons are more complicated
// I mean, look at the menu class :P

// Handles a single button
function button(newX, newY, newMsg) {
	this.x = newX;
	this.y = newY;
	this.msg = newMsg;
	this.width = 0;
	this.height = 10;
	this.isClicked = 0;
	// In the future: color, image, etc

	this.draw = draw;
	this.clicked = clicked;

	function draw(ctx) {
		ctx.font = "10px Arial";
		textDimensions = ctx.measureText(this.msg);

		ctx.fillStyle = "#000";
		ctx.fillRect(this.x, this.y, textDimensions.width, this.height);
		ctx.stroke();

		ctx.fillStyle = "#FFF";
		ctx.fillText(this.msg, this.x, this.y+8);
		ctx.stroke();

		ctx.fillStyle = "#000";

		// To avoid making a new context elsewhere,
		// we'll set the height and width here
		// The button will have to draw
		// before it can be clicked anyways
		this.width = textDimensions.width;
	}

	function clicked(newX, newY) {
		if (newX > this.x && newX < this.x + this.width && newY > this.y && newY < this.y + this.height) {
			this.isClicked = 1;
		}
	}
}