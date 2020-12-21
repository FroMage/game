const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 60;
const frame = 0;

var bg1;
var bg1Offset = 0;
const bg1Speed = 3;

var bg2;
var bg2Offset = 0;
const bg2Speed = 2;

var bg3;
var bg3Offset = 0;
const bg3Speed = 1;

var hero;
var heroOffset = 480/2;
const heroSpeed = 6;

function clear(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 640, 480);
}

function drawBackground(bg, offset){
	// x10 w630 -> x0 w630
	var sx1 = offset 
	var sw1 = 640 - sx1;
	// first half [... offset 640] -> 0
	ctx.drawImage(bg, sx1, 0, sw1, 480, 0, 0, sw1, 480);
	// x0 w10 -> x630 w10
	var dx2 = 640 - offset;
	var sw2 = offset;
	// second half [0 offset...] -> offset
	ctx.drawImage(bg, 0, 0, sw2, 480, dx2, 0, sw2, 480);
}

function drawSprite(img, x, y){
	ctx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
}

function draw(){
	clear();
	drawBackground(bg1, bg1Offset);
	drawBackground(bg2, bg2Offset);
	drawBackground(bg3, bg3Offset);
	drawSprite(hero, 32, heroOffset);
	bg1Offset += bg1Speed;
	bg2Offset += bg2Speed;
	bg3Offset += bg3Speed;
	bg1Offset = (bg1Offset % 640);
	bg2Offset = (bg2Offset % 640);
	bg3Offset = (bg3Offset % 640);
}

function startLoop(){
	setInterval(draw, 1000/fps);
}

function loadBg(){
	var loading = 4;
    const bitmaps = [];
    function makeLoader(i, img, bitmaps){
        return function() {
        	var w = i <= 2 ? 640 : 32; 
        	var h = i <= 2 ? 480 : 32; 
    		  createImageBitmap(img, 0, 0, w, h)
    		    .then(function(bitmap){
    		    	bitmaps[i] = bitmap;
    		    	if(--loading == 0){
    		    		bg1 = bitmaps[0];
    		    		bg2 = bitmaps[1];
    		    		bg3 = bitmaps[2];
    		    		hero = bitmaps[3];
    		    		startLoop();
    		    	}
    		    });
    		};
    }
    for (i = 0; i <= 2; i++) {
        const img = new Image;
        img.src = "../images/bg-"+(i+1)+".png";
        img.onload = makeLoader(i, img, bitmaps);
    }   
    const img = new Image;
    img.src = "../images/hero.png";
    img.onload = makeLoader(3, img, bitmaps);
}

window.addEventListener('load', (event) => {
	loadBg();
});

document.addEventListener("keydown", event => {
	if (event.isComposing || event.keyCode === 229) {
	    return;
	}
	var consumed = false;
	if(event.keyCode == 38){
		heroOffset = Math.max(heroOffset - heroSpeed, 32);
		consumed = true;
	} else if(event.keyCode == 40){
		heroOffset = Math.min(heroOffset + heroSpeed, 480 - 32);
		consumed = true;
	}
	if(consumed){
		event.preventDefault();
		event.stopPropagation();
	}
});
