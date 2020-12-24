const channels = 6;

var pewSound = new MultiChannelAudio('../sounds/pew.mp3');
var explosionSound = new MultiChannelAudio('../sounds/explosion.mp3');
var hurtSound = new MultiChannelAudio('../sounds/hurt.mp3');
var heartSound = new MultiChannelAudio('../sounds/heart.mp3');
var deadSound = new MultiChannelAudio('../sounds/dead.mp3');
var introMusic = new Audio('../sounds/intro_music.mp3');
var normalMusic = new Audio('../sounds/normal_music.mp3');
var bossMusic = new Audio('../sounds/boss_music.mp3');

introMusic.addEventListener('ended', nextMusic);
normalMusic.addEventListener('ended', nextMusic);
bossMusic.addEventListener('ended', nextMusic);

const musicQueue = [];

function nextMusic(){
	musicQueue.shift();
	if(musicQueue.length > 0){
		musicQueue[0].play();
	}
}

function playMusic(music, loop){
	music.loop = loop;
	musicQueue.push(music);
	if(musicQueue.length > 1){
		musicQueue[0].loop = false;
		if(musicQueue[0].ended){
			nextMusic();
		}
	} else {
		music.play();
	}
}

function pauseMusic(){
	if(musicQueue.length > 0){
		if(musicQueue[0].paused)
			musicQueue[0].play();
		else
			musicQueue[0].pause();
	}
}

function resetMusic(){
	if(musicQueue.length > 0){
		// there's no stop
		musicQueue[0].pause();
		musicQueue[0].currentTime = 0;
	}
	musicQueue.length = 0;
}

function stopMusic(){
	if(musicQueue.length > 0){
		musicQueue[0].loop = false;
		musicQueue.length = 1;
	}
}

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

