var score = 0;

function drawScore(){
	ctx.font = '12px monospace';
	ctx.fillStyle = 'red';
	ctx.fillText("Score: "+score, 10, 20);
}

