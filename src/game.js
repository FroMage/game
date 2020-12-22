const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 60;
const frame = 0;

var timerId;
var gameOver = false;

function clear(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 640, 480);
}

function drawGameOver(){
	let height = 64;
	ctx.font = height+'px monospace';
	ctx.fillStyle = 'red';
	let text = "GAME OVER";
	let size = ctx.measureText(text);
	console.log(size);
	ctx.fillText(text, (640-size.width)/2, (480+height)/2);
}

function drawGame(){
	clear();
	makeBaddies();
	drawBackgrounds();
	drawScore();
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
		"../images/bad-1.png"
	], function(bitmaps) {
		[bg1, bg2, bg3, heroSprite, bad1Sprite] = bitmaps;
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
		if(!gameOver){
			hero.y = Math.max(hero.y - heroSpeed, 32);
		}
		break;
	case 40: // down
		if(!gameOver){
			hero.y = Math.min(hero.y + heroSpeed, 480 - 32);
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
