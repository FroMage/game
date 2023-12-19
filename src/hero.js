var heroSprite;
const heroSpeed = 6;

var projectiles = [];
var objects = [];

function makeHero(){
	hero = {
			x: 32,
			y: 480/2,
			w: 32,
			h: 32,
			grace: 0,
			hearts: 3,
			movement: 0,
			img: heroSprite,
			explosionSound: deadSound,
			explode: function(){
				explode(this);
			},
			move: function() {
				this.y = Math.min(480 - 64 - 32, Math.max(20, this.y + this.movement));
			},
			draw: function() {
				if(this.grace == 0 || (this.grace-- % 20) < 10){
					drawSprite(this);
				}
			}
	}
	addDialog(heroTalkingSprite, "Bon, on va visiter ce secteur");
	addDialog(heroWonderingSprite, "Je la sens mal, cette histoire");
}

function heroShoots(){
	var large=false;
	if(energy==5){
		large=true;
		energy=0;
	}
	let projectile = {
			x: 32 + 32,
			y: hero.y + 14,
			w: 10,
			h: large ? 10 : 1,
			large: large,
			color: 'white',
			friend: true,
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

function heroTouched(){
	if(--hero.hearts == 0){
		hero.dead = true;
		hero.explode();
		gameOver = true;
		stopMusic();
	} else {
		// three seconds
		hero.grace = 3 * fps;
		hurtSound.play();
	}
}

function drawProjectile(projectile){
	ctx.strokeStyle = projectile.color;
	ctx.lineWidth = 2;
	ctx.beginPath();       // Start a new path
	ctx.moveTo(projectile.x, projectile.y);  // Move the pen to (x, y)
	if(projectile.large){
		ctx.fillRect(projectile.x, projectile.y ,projectile.x + projectile.w, projectile.y + projectile.h);  // Draw a line to (x+10, y)
		
	}
	else {
		ctx.lineTo(projectile.x + projectile.w, projectile.y + projectile.h);  // Draw a line to (x+10, y)
	}
	ctx.stroke();          // Render the path
}

function makeObjects(){
	let rand = Math.random();
	// 0.2% chance
	if(rand < 0.002){
		makeHeart();
	}
}

function makeHeart(){
	objects.push({
		x : 630,
		y : 30 + Math.floor(Math.random() * (480 - 64 - 16)),
		w: 16,
		h: 16,
		img: heartFullSprite,
		draw: function(){
			drawSprite(this);
		},
		move: function(){
			this.x -= bad1Speed;
		},
		valid: function(){
			return this.x > 0 && !this.dead;
		},
		eat: function(){
			if(!gameOver){
				hero.hearts = Math.min(hero.hearts + 1, 3);
				heartSound.play();
			}
		}
	});
}
