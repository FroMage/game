var explosions = [];

function drawExplosion(explosion){
	let adjust = Math.floor(explosion.radius * 0.75);
	// N
	drawExplosionPart(explosion.x, explosion.y - explosion.radius);
	// NE
	drawExplosionPart(explosion.x + adjust, explosion.y - adjust);
	// E
	drawExplosionPart(explosion.x + explosion.radius, explosion.y);
	// SE
	drawExplosionPart(explosion.x + adjust, explosion.y + adjust);
	// S
	drawExplosionPart(explosion.x, explosion.y + explosion.radius);
	// SW
	drawExplosionPart(explosion.x - adjust, explosion.y + adjust);
	// W
	drawExplosionPart(explosion.x - explosion.radius, explosion.y);
	// NW
	drawExplosionPart(explosion.x - adjust, explosion.y - adjust);
}

function drawExplosionPart(x, y){
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.ellipse(x, y, 5, 5, 0, 0, 2 * Math.PI);
	ctx.fill();
}

function explode(baddie){
	explosions.push({
		x: baddie.x + baddie.w/2,
		y: baddie.y + baddie.h/2,
		radius: 0,
		inertia: bad1Speed,
		draw: function(){
			drawExplosion(this);
		},
		move: function(){
			this.radius++;
			// inertia
			this.x -= this.inertia;
		},
		valid: function(){
			return this.radius < 20;
		}
	});
	score += 10;
	explosionSound.play();
}
