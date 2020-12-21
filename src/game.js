const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fps = 60;
const frame = 0;


function clear(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 640, 480);
}

function draw(){
	clear();
	drawBackgrounds();
	drawSprites();
}

function startLoop(){
	setInterval(draw, 1000/fps);
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
		"../images/hero.png"
	], function(bitmaps) {
		[bg1, bg2, bg3, hero] = bitmaps;
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
		heroShoots();
		break;
	case 38: // up
		heroOffset = Math.max(heroOffset - heroSpeed, 32);
		break;
	case 40: // down
		heroOffset = Math.min(heroOffset + heroSpeed, 480 - 32);
		break;
	default:
		consumed = false;
	}
	if(consumed){
		event.preventDefault();
		event.stopPropagation();
	}
});
