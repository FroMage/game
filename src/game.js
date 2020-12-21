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

function draw(){
	clear();
	drawBackground(bg1, bg1Offset);
	drawBackground(bg2, bg2Offset);
	drawBackground(bg3, bg3Offset);
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
	var loading = 3;
    const bitmaps = [];
    function makeLoader(i, img, bitmaps){
        return function() {
    		  createImageBitmap(img, 0, 0, 640, 480)
    		    .then(function(bitmap){
    	    		console.log("bitmaps["+i+"]: "+bitmap);
    		    	bitmaps[i] = bitmap;
    		    	if(--loading == 0){
    		    		bg1 = bitmaps[0];
    		    		bg2 = bitmaps[1];
    		    		bg3 = bitmaps[2];
    		    		console.log("bg1: "+bg1);
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
}


window.addEventListener('load', (event) => {
	loadBg();
});

