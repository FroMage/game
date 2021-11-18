var baddies = [];

var bad1Sprite;
const bad1Speed = 2;

var bad2Sprite;

var bad3Sprite;

var bossSprite;

var bossHere = false;

function makeBoss(){
	bossHere = true;
	let centerX = 640 - 128 - 40;
	let centerY = (480 - 128) / 2;
	baddies.push({
		centerX: centerX,
		centerY: centerY,
		x : centerX + 200, // coming offset
		y : centerY + 50, // radius
		w: 128,
		h: 128,
		grace: 0,
		hearts: 3,
		reward: 200,
		img: bossSprite,
	    explosionSound: explosionSound,
		// for moving sprites
		angle: 0,
		coming: 200,
		shoot: fps * 3,
		exploding: 0,
		explode: function(){
			addDialog(bossSadSprite, "J‘ai une légère panne de moteur");
			explodeBig(this);
			this.exploding = 200;
		},
		draw: function(){
			drawHearts(this.hearts, 480 - 100);
			if(this.grace == 0 || (this.grace-- % 20) < 10){
				drawSprite(this);
			}
		},
		move: function(){
			if(this.exploding > 0){
				// only add explosion every 2 frames
				if(this.exploding % 2 == 0){
					addBigExplosionPart(this);
				}
				this.exploding--;
				if(this.exploding == 0){
					addDialog(bossTalkingSprite, "Je me vengerai !");
					addDialog(heroHappySprite, "Bon débarras !");
					bossHere = false;
					playMusic(normalMusic, true);
				}
			} else if(this.coming-- > 0){
				this.x--;
			} else {
				if(!gameOver && !this.grace && --this.shoot == 0){
					this.shoot = fps * 3;
					bossShoots(this);
				}
				this.angle = (this.angle + 0.2) % 360;
				this.x = this.centerX + Math.sin(this.angle / (2 * Math.PI)) * 50;
				this.y = this.centerY + Math.cos(this.angle / (2 * Math.PI)) * 50;
			}
		},
		valid: function(){
			return this.x > 0 && (!this.dead || this.exploding > 0);
		}
	});
	addDialog(bossTalkingSprite, "Je vais t‘écrabouiller !!");
	playMusic(bossMusic, true);
}

function makeBaddie(type){
	baddies.push({
		x : 630,
		y : 30 + Math.floor(Math.random() * 440),
		w: 32,
		h: 32,
		reward: type == 1 ? 10 : 20,
		img: type == 1 ? bad1Sprite : type == 2 ? bad2Sprite : bad3Sprite,
	    explosionSound: explosionSound,
	    grace: 0,
	    hearts: 1,
		// for moving sprites
		movementOffset: 0,
		movement: 1,
		shoot: fps * 3,
		explode: function(){
			explode(this);
		},
		draw: function(){
			drawSprite(this);
		},
		move: function(){
			if(!gameOver && --this.shoot == 0){
				this.shoot = fps * 3;
				baddieShoots(this);
			}
			if(type == 1){
				this.x -= bad1Speed;
			} else if(type == 2) {
				this.x -= bad1Speed;
				this.movementOffset += this.movement;
				if(this.movementOffset <= -20){
					this.movement = 1;
				} else if(this.movementOffset > 20){
					this.movement = -1;
				}
				this.y += this.movement;
			} else {
				this.x -= bad1Speed;
				this.movementOffset += this.movement;
				if(this.movementOffset <= -20){
					this.movement = 1;
				} else if(this.movementOffset > 20){
					this.movement = -1;
				}
				this.x += this.movement;
			}
		},
		valid: function(){
			return this.x > 0 && !this.dead;
		}
	});
}

function baddieShoots(baddie){
	let originX = baddie.x + baddie.w/2;
	let originY = baddie.y + baddie.h/2;
	let targetX = hero.x + hero.w/2;
	let targetY = hero.y + hero.h/2;
	let horiz = targetX - originX;
	let vert = targetY - originY;
	let angle = Math.atan(vert / horiz);
	let projectile = {
			x: originX,
			y: originY,
			w: -10 * Math.cos(angle),
			h: -10 * Math.sin(angle),
			color: 'red',
			friend: false,
			draw: function(){
				drawProjectile(this);
			},
			move: function(){
				this.x += Math.floor(this.w / 2);
				this.y += Math.floor(this.h / 2);
			},
			valid: function(){
				return this.x < 640 &&
					this.y < 480 &&
					this.x > 0 &&
					this.y > 0 &&
					!this.dead;
			}
	}
	pewSound.play();
	projectiles.push(projectile);
}

function bossShoots(baddie){
	let originX = baddie.x + baddie.w/2;
	let originY = baddie.y + baddie.h/2;
	let targetX = hero.x + hero.w/2;
	let targetY = hero.y + hero.h/2;
	let projectile = {
			x: originX,
			y: originY,
			w: 10,
			h: 10,
			directionX: 0,
			directionY: 0,
			color: 'green',
			friend: false,
			draw: function(){
				drawCircleProjectile(this);
			},
			move: function(){
				this.x += this.directionX * Math.floor(this.w / 2);
				this.y += this.directionY * Math.floor(this.h / 2);
			},
			valid: function(){
				return this.x < 640 &&
					this.y < 480 &&
					this.x > 0 &&
					this.y > 0 &&
					!this.dead;
			}
	}
	var projUp = Object.assign({}, projectile);
	var projDown = Object.assign({}, projectile);
	var projLeft = Object.assign({}, projectile);
	var projRight = Object.assign({}, projectile);
	var projUpRight = Object.assign({}, projectile);
	var projUpLeft = Object.assign({}, projectile);
	var projDownRight = Object.assign({}, projectile);
	var projDownLeft = Object.assign({}, projectile);
	
	projUp.directionY = -1;
	projDown.directionY = 1;
	projLeft.directionX = -1;
	projRight.directionX = 1;

	projUpRight.directionX = 1;
	projUpRight.directionY = -1;
	projUpLeft.directionX = -1;
	projUpLeft.directionY = -1;
	projDownRight.directionX = 1;
	projDownRight.directionY = 1;
	projDownLeft.directionX = -1;
	projDownLeft.directionY = 1;

	projectiles.push(projUp);
	projectiles.push(projDown);
	projectiles.push(projLeft);
	projectiles.push(projRight);
	projectiles.push(projUpRight);
	projectiles.push(projUpLeft);
	projectiles.push(projDownRight);
	projectiles.push(projDownLeft);
	pewSound.play();
}


function drawCircleProjectile(projectile){
	ctx.fillStyle = projectile.color;
	ctx.beginPath();
	ctx.ellipse(projectile.x, projectile.y, 10, 10, 0, 0, 2 * Math.PI);
	ctx.fill();
}


function makeBaddies(){
	if(bossHere){
		return;
	}
	if(frame != 0 && (frame % (fps * 10)) == 0){
		makeBoss();
		return;
	}
	let rand = Math.random();
	// 1% chance
	if(rand < 0.01){
		// 0.1% green
		if(rand < 0.001){
			makeBaddie(3);
		// 0.1% blue
		} else if(rand < 0.002){
			makeBaddie(2);
		}else{
			makeBaddie(1);
		}
	}
}

function baddieTouched(baddie){
	if(--baddie.hearts == 0){
		baddie.dead = true;
		baddie.explode();
	} else {
		// three seconds
		baddie.grace = 3 * fps;
		hurtSound.play();
	}
}
