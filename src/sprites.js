var hero;
var heroOffset = 480/2;
const heroSpeed = 6;

var projectiles = [];

function drawSprite(img, x, y){
	ctx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
}

function drawSprites(){
	drawSprite(hero, 32, heroOffset);
	for(let projectile of projectiles){
		drawProjectile(projectile);
	}
	// remove out of bounds projectiles
	projectiles = projectiles.filter(function(projectile){ return projectile.x < 640; });
}

function drawProjectile(projectile){
	ctx.beginPath();       // Start a new path
	ctx.moveTo(projectile.x, projectile.y);  // Move the pen to (x, y)
	ctx.lineTo(projectile.x+10, projectile.y);  // Draw a line to (x+10, y)
	ctx.stroke();          // Render the path
	
	// make it move
	projectile.x += 20;
}

function heroShoots(){
	let projectile = {
			x: 32 + 32,
			y: heroOffset + 14
	}
	pew.play();
	projectiles.push(projectile);
}