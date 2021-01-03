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

//const C4 = 261.63;
//const Cs4 = 277.18;
//const D4 = 293.66;
//const Ds4 = 311.13;
//const E4 = 329.63;
//const F4 = 349.23;
//const Fs4 = 369.99;
//const G4 = 392.00;
//const Gs4 = 415.30;
//const A4 = 440.00;
//const As4 = 466.16;
//const B4 = 493.88;
//
//var audioContext = null;
//var plannedNotes = 0;
//const bpm = 120;
//const bps = 120 / 60;
//const blackDuration = 1 / bps;
//const whiteDuration = 2 * blackDuration;
//const roundDuration = 4 * blackDuration;
//
//function playNote(note, duration){
//	if(audioContext == null){
//		 audioContext = new AudioContext()
//		 plannedNotes = audioContext.currentTime;
//	}
//	if(!duration){
//		duration = blackDuration;
//	}
//    var oscillator = audioContext.createOscillator();
//
//    oscillator.type = "sine";
//    oscillator.frequency.value = note;
//
//    const gainNode = audioContext.createGain();
//    gainNode.gain.exponentialRampToValueAtTime(1, plannedNotes);
//    gainNode.gain.exponentialRampToValueAtTime(1, plannedNotes + duration - 0.03);
//    gainNode.gain.exponentialRampToValueAtTime(0.00001, plannedNotes + duration);
//    
//    var distortionGainNode = audioContext.createGain();
//    var distortionNode = audioContext.createWaveShaper();
//
//    function makeDistortionCurve(amount) {
//        var k = amount,
//            n_samples = typeof sampleRate === 'number' ? sampleRate : 44100,
//            curve = new Float32Array(n_samples),
//            deg = Math.PI / 180,
//            i = 0,
//            x;
//        for ( ; i < n_samples; ++i ) {
//            x = i * 2 / n_samples - 1;
//            curve[i] = (3 + k)*Math.atan(Math.sinh(x*0.25)*5) / (Math.PI + k * Math.abs(x));
//        }
//        return curve;
//    }
//
//    distortionNode.curve = makeDistortionCurve(700);
//    
//    oscillator.connect(gainNode);
//    gainNode.connect(distortionGainNode);
//    distortionGainNode.connect(distortionNode);
//    distortionNode.connect(audioContext.destination);
////    gainNode.connect(audioContext.destination);
//    
//    console.log("currentTime "+audioContext.currentTime);
//    console.log("sending note at "+plannedNotes);
//    oscillator.start(plannedNotes);
//    plannedNotes += duration;
//    oscillator.stop(plannedNotes);
//}
