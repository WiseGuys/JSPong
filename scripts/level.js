// level.js
// Bill Derouin
// Level object
// Contains level:
// Name
// Sound order
// Text
// Victory screen

function level(sName, sText, sWin, aSounds, pers, bgtrack, iGoal) {
	// Vars
	this.name = sName;
	this.text = sText;
	this.victory = sWin;
	this.sounds = aSounds; // an array of sounds
	this.curSound = 0;
	this.maxSounds = aSounds.length;
	this.aiPersonality = pers;
	this.bgmusic = bgtrack;
	this.goal = iGoal;
}