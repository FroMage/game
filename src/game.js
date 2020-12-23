const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 60;

var timerId;
var gameOver = false;
var frame = 0;

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
	}
}

function startLoop(){
	makeHero();
	setInterval(drawGame, 1000/fps);
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

window.addEventListener('load', (event) => {
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
	], function(bitmaps) {
		[bg1, bg2, bg3, heroSprite, bad1Sprite, bad2Sprite, 
			bossSprite, heartEmptySprite, heartFullSprite] = bitmaps;
		startLoop();
	});
});

document.addEventListener("keydown", event => {
	if (event.isComposing || event.keyCode === 229) {
	    return;
	}
	var consumed = true;
	switch(event.keyCode){
	case 32: // space
		if(!gameOver){
			heroShoots();
		}
		break;
	case 38: // up
		hero.movement = -3;
		break;
	case 40: // down
		hero.movement = 3;
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
		hero.movement = 0;
		break;
	case 40: // down
		hero.movement = 0;
		break;
	default:
		consumed = false;
	}
	if(consumed){
		event.preventDefault();
		event.stopPropagation();
	}
});
