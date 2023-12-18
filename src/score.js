var score = 0;
var heartEmptySprite;
var heartFullSprite;

function drawScore(){
	ctx.font = '12px monospace';
	ctx.fillStyle = 'white';
	ctx.fillText("Score: "+score, 10 + (4*16), 20);
}

function drawHearts(hearts, offset){
	for(var i=0 ; i<3 ; i++){
		let sprite = hearts > i ? heartFullSprite : heartEmptySprite;
		drawSprite({img: sprite, x: offset + (i * 16), y: 8, w: 16, h:16});
	}
}