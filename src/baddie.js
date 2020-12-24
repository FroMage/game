var baddies = [];

var bad1Sprite;
const bad1Speed = 2;

var bad2Sprite;

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
					baddieShoots(this);
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
		img: type == 1 ? bad1Sprite : bad2Sprite,
	    explosionSound: explosionSound,
	    grace: 0,
	    hearts: 1,
		// for moving sprites
		movementOffset: 0,
		movement: 2,
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
			} else {
				this.x -= bad1Speed;
				this.movementOffset += this.movement;
				if(this.movementOffset <= -20){
					this.movement = 1;
				} else if(this.movementOffset > 20){
					this.movement = -1;
				}
				this.y += this.movement;
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

function makeBaddies(){
	if(bossHere){
		return;
	}
	if(frame != 0 && (frame % (fps * 40)) == 0){
		makeBoss();
		return;
	}
	let rand = Math.random();
	// 1% chance
	if(rand < 0.01){
		// 0.2% blue
		if(rand < 0.002){
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
