var score = 0;
var energy = 0;
var heartEmptySprite;
var heartFullSprite;
var powerup;

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
function drawEnergy(){
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.beginPath();       // Start a new path
	var x = 150;
	var y = 10;
	var w = 65;
	var h = 15;
	ctx.moveTo(x , y);  // Move the pen to (x, y)
	ctx.lineTo(x + w , y);  // Draw a line to (x+10, y)
	ctx.lineTo(x + w , y + h);  // Draw a line to (x+10, y)
	ctx.lineTo(x , y + h);  // Draw a line to (x+10, y)
	ctx.lineTo(x , y);  // Draw a line to (x+10, y)
	ctx.stroke();          // Render the path
	ctx.fillStyle = "red";
	ctx.fillRect(x , y , (65/5)*energy , h);
	
}