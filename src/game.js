const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 60;

var frame = 0;
var gameStarted = false;
var gameOver = false;
var gamePaused = false;

function clear(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, 640, 480);
}

function drawGameOver(){
	let height = 64;
	ctx.font = height+'px monospace';
	ctx.fillStyle = 'red';
	let text = "GAME OVER";
	let size = ctx.measureText(text);
	ctx.fillText(text, (640-size.width)/2, (480+height)/2);
}

function drawGameOver(){
	let height = 64;
	ctx.font = height+'px monospace';
	ctx.fillStyle = 'red';
	let text = "GAME OVER";
	let size = ctx.measureText(text);
	ctx.fillText(text, (640-size.width)/2, (480+height)/2);
}

function drawStart(){
	let height = 64;
	ctx.font = height+'px monospace';
	ctx.fillStyle = 'blue';
	let text = "PRESS SPACE";
	let size = ctx.measureText(text);
	ctx.fillText(text, (640-size.width)/2, (480+height)/2);
}

function drawPaused(){
	let height = 64;
	ctx.font = height+'px monospace';
	ctx.fillStyle = 'blue';
	let text = "PAUSE";
	let size = ctx.measureText(text);
	ctx.fillText(text, (640-size.width)/2, (480+height)/2);
}

function drawGame(){
	frame++;
	clear();
	makeBaddies();
	makeObjects();
	drawBackgrounds();
	drawScore();
	drawHearts(hero.hearts, 10);
	// this detects collisions and can game over
	handleSprites();
	if(gameOver){
		drawGameOver();
	} else if(gamePaused){
		drawPaused();
	}
	drawDialog();
	if(!gamePaused){
		window.requestAnimationFrame(drawGame);
	}
}

function start(){
	makeHero();
	playMusic(introMusic);
	playMusic(normalMusic, true);
}

function startLoop(){
	start();
	window.requestAnimationFrame(drawGame);
}

function pauseGame(){
	pauseMusic();
	if(gamePaused){
		gamePaused = false;
		window.requestAnimationFrame(drawGame);
	}else{
		gamePaused = true;
	}
}

function restartGame(){
	frame = 0;
	score = 0;
	gameOver = false;
	resetSprites();
	resetMusic();
	start();
}

function loadImages(files, imagesLoaded){
	var loading = files.length;
    const bitmaps = [];
    for (let i = 0; i < files.length; i++) {
        const img = new Image;
        img.src = files[i];
        img.onload = function() {
  		  createImageBitmap(img, 0, 0, img.width, img.height)
  		    .then(function(bitmap){
  		    	bitmaps[i] = bitmap;
  		    	if(--loading == 0){
  		    		imagesLoaded(bitmaps);
  		    	}
  		    });
  		};
    }   
}

function startGame(){
	if(gameStarted){
		restartGame();
	} else {
		gameStarted = true;
		startLoop();
	}
}

window.addEventListener('load', function(event) {
	registerKeyListeners();
	loadImages([
		"../images/bg-1.png",
		"../images/bg-2.png",
		"../images/bg-3.png",
		"../images/hero.png",
		"../images/bad-1.png",
		"../images/bad-2.png",
		"../images/boss.png",
		"../images/heart-empty.png",
		"../images/heart-full.png",
		"../images/hero-happy.png",
		"../images/hero-talking.png",
		"../images/hero-wondering.png",
		"../images/boss-talking.png",
		"../images/boss-sad.png",
		], function(bitmaps) {
		[bg1, bg2, bg3, heroSprite, bad1Sprite, bad2Sprite, 
			bossSprite, heartEmptySprite, heartFullSprite,
			heroHappySprite, heroTalkingSprite, heroWonderingSprite,
			bossTalkingSprite, bossSadSprite] = bitmaps;
		clear();
		drawBackgrounds();
		drawStart();
	});
});

function fullScreen(){
	if(document.fullscreenElement){
		document.exitFullscreen();
	}else{
		canvas.requestFullscreen();
	}
}

function registerKeyListeners(){
	document.addEventListener("keydown", event => {
		if (event.isComposing || event.keyCode === 229) {
		    return;
		}
		var consumed = true;
		console.log(event.keyCode);
		switch(event.keyCode){
		case 13: // enter
			if(gameStarted && !gameOver){
				pauseGame();
			}
			break;
		case 70: // f
			fullScreen();
			break;
		case 32: // space
			if(gamePaused){
				pauseGame();
			} else if(gameOver || !gameStarted){
				startGame();
			} else {
				heroShoots();
			}
			break;
		case 38: // up
			if(gameStarted){
				hero.movement = -3;
			}
			break;
		case 40: // down
			if(gameStarted){
				hero.movement = 3;
			}
			break;
		default:
			consumed = false;
		}
		if(consumed){
			event.preventDefault();
			event.stopPropagation();
		}
	});

	document.addEventListener("keyup", event => {
		if (event.isComposing || event.keyCode === 229) {
		    return;
		}
		var consumed = true;
		switch(event.keyCode){
		case 38: // up
			if(gameStarted){
				hero.movement = 0;
			}
			break;
		case 40: // down
			if(gameStarted){
				hero.movement = 0;
			}
			break;
		default:
			consumed = false;
		}
		if(consumed){
			event.preventDefault();
			event.stopPropagation();
		}
	});
}
