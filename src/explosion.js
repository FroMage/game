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

function addSimpleExplosion(sprite){
	explosions.push({
		x: sprite.x + sprite.w/2,
		y: sprite.y + sprite.h/2,
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
}

function explode(sprite){
	addSimpleExplosion(sprite);
	if(sprite.reward) {
		score += sprite.reward;
	}
	if(energy < 5) {	
		energy += 1;
	}
	sprite.explosionSound.play();
}

function explodeBig(sprite){
	if(sprite.reward) {
		score += sprite.reward;
	}
	if(energy < 5) {	
		energy += 1;
	}
	sprite.explosionSound.play();
}

function addBigExplosionPart(sprite){
	let x = sprite.x + (sprite.w * Math.random());
	let y = sprite.y + (sprite.h * Math.random());
	explosions.push({
		x: x,
		y: y,
		radius: 0,
		draw: function(){
			drawExplosionCircle(this.x, this.y, this.radius);
		},
		move: function(){
			this.radius += 0.2;
		},
		valid: function(){
			return this.radius < 20;
		}
	});

}

function drawExplosionCircle(x, y, radius){
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
	ctx.stroke();
}
