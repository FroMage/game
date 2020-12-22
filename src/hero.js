var heroSprite;
const heroSpeed = 6;

var projectiles = [];

function makeHero(){
	hero = {
			x: 32,
			y: 480/2,
			w: 32,
			h: 32,
			img: heroSprite,
			draw: function() {
				drawSprite(this);
			}
	}
}

function heroShoots(){
	let projectile = {
			x: 32 + 32,
			y: hero.y + 14,
			w: 10,
			h: 1,
			draw: function(){
				drawProjectile(this);
			},
			move: function(){
				this.x += 20;
			},
			valid: function(){
				return this.x < 640 && !this.dead;
			}
	}
	pewSound.play();
	projectiles.push(projectile);
}

function drawProjectile(projectile){
	ctx.beginPath();       // Start a new path
	ctx.moveTo(projectile.x, projectile.y);  // Move the pen to (x, y)
	ctx.lineTo(projectile.x + projectile.w, projectile.y);  // Draw a line to (x+10, y)
	ctx.stroke();          // Render the path
}
