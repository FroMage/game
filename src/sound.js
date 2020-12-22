const channels = 6;

var pewSound = new MultiChannelAudio('../sounds/pew.mp3');
var explosionSound = new MultiChannelAudio('../sounds/explosion.mp3');
var hurtSound = new MultiChannelAudio('../sounds/hurt.mp3');

function MultiChannelAudio(src) {
	this.channels = [];
	this.index = 0;

	for (var i = 0; i < channels; i++) {
		this.channels.push(new Audio(src));
	}
}

MultiChannelAudio.prototype.play = function() {
	this.channels[this.index++ % channels].play();
}
