var score = 0;
var heartEmptySprite;
var heartFullSprite;

function drawScore(){
	ctx.font = '12px monospace';
	ctx.fillStyle = 'red';
	ctx.fillText("Score: "+score, 10 + (4*16), 20);
}

function drawHearts(){
	for(var i=0 ; i<3 ; i++){
		let sprite = hero.hearts > i ? heartFullSprite : heartEmptySprite;
		drawSprite({img: sprite, x: 10 + (i * 16), y: 8, w: 16, h:16});
	}
}