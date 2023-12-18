var bg1;
var bg1Offset = 0;
const bg1Speed = 3;

var bg2;
var bg2Offset = 0;
const bg2Speed = 2;

var bg3;
var bg3Offset = 0;
const bg3Speed = 1;

var bg4;
var bg4Offset = 0;
const bg4Speed = 4;

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

function drawBackgrounds(){
	// draw
	drawBackground(bg1, bg1Offset);
	drawBackground(bg2, bg2Offset);
	drawBackground(bg3, bg3Offset);
	drawBackground(bg4, bg4Offset);
	// scroll
	bg1Offset += bg1Speed;
	bg2Offset += bg2Speed;
	bg3Offset += bg3Speed;
	bg4Offset += bg4Speed;
	bg1Offset = (bg1Offset % 640);
	bg2Offset = (bg2Offset % 640);
	bg3Offset = (bg3Offset % 640);
	bg4Offset = (bg4Offset % 640);


}