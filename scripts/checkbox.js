// checkbox.js
// Bill Derouin
// Object for a single checkbox
// Similar to button
function checkbox(newX, newY, newText) {
	this.x = newX;
	this.y = newY;
	this.text = newText;
	this.height = 10; // square box, so same for width
	this.isChecked = 0;
	this.isClicked = 0;

	this.draw = draw;
	this.clicked = clicked;

	function draw(ctx) {
		// The box
		ctx.fillStyle = "#000";
		ctx.strokeRect(this.x, this.y, this.height, this.height);
		ctx.stroke();

		// Text
		ctx.font = "10px Arial";
		ctx.fillStyle = "#000";
		ctx.fillText(this.text, this.x + this.height + 5, this.y+8);
		ctx.stroke();

		// Checked?
		ctx.fillStyle = "#000";
		if (this.isChecked) {
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.x + this.height, this.y + this.height);
			ctx.stroke;

			ctx.moveTo(this.x, this.y + this.height);
			ctx.lineTo(this.x + this.height, this.y);
			ctx.stroke();
		}
	}

	function clicked(newX, newY) {
		if (newX > this.x && newX < this.x + this.height && newY > this.y && newY < this.y + this.height) {
			this.isClicked = 1;
		}
	}
}