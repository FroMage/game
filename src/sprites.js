var hero;
var heroOffset = 480/2;
const heroSpeed = 6;

var projectiles = [];
var baddies = [];

var bad1;
const bad1Speed = 2;

function drawSprite(img, x, y){
	ctx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
}

function drawSprites(){
	let explode = false;
	drawSprite(hero, 32, heroOffset);
	for(let projectile of projectiles){
		// detect collisions
		for(let baddie of baddies){
			if(!baddie.dead && collision(baddie, projectile)){
				baddie.dead = true;
				projectile.dead = true;
				explode = true;
			}
		}
		if(!projectile.dead){
			drawProjectile(projectile);
		}
	}
	for(let baddie of baddies){
		if(!baddie.dead){
			drawBaddie(baddie);
		}
	}
	// remove out of bounds and dead projectiles
	projectiles = projectiles.filter(function(projectile){ 
		return projectile.x < 640 && !projectile.dead;
	});
	// remove out of bounds and dead baddies
	baddies = baddies.filter(function(baddie){
		return baddie.x > 0 && !baddie.dead;
	});
	if(explode){
		explosion.play();
	}
}

function drawProjectile(projectile){
	ctx.beginPath();       // Start a new path
	ctx.moveTo(projectile.x, projectile.y);  // Move the pen to (x, y)
	ctx.lineTo(projectile.x + projectile.w, projectile.y);  // Draw a line to (x+10, y)
	ctx.stroke();          // Render the path
	
	// make it move
	projectile.x += 20;
}

function drawBaddie(baddie){
	drawSprite(bad1, baddie.x, baddie.y);
	// make it move
	baddie.x -= bad1Speed;
}

function heroShoots(){
	let projectile = {
			x: 32 + 32,
			y: heroOffset + 14,
			w: 10,
			h: 1
	}
	pew.play();
	projectiles.push(projectile);
}

function makeBaddie(){
	baddies.push({
		x : 630,
		y : 30 + Math.floor(Math.random() * 440),
		w: 32,
		h: 32
	});
}

function collision(a, b){
	// a is before on x
	if(a.x + a.w < b.x)
		return false;
	// a is after on x
	if(a.x > b.x + b.w)
		return false;
	// a is before on y
	if(a.y + a.y < b.y)
		return false;
	// a is after on y
	if(a.y > b.y + b.h)
		return false;
	// collision
	return true;
}

function makeBaddies(){
	// 1% chance
	if(Math.random() < 0.01){
		makeBaddie();
	}
}