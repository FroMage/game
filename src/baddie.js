var baddies = [];

var bad1Sprite;
const bad1Speed = 2;

var bad2Sprite;

function makeBaddie(type){
	baddies.push({
		x : 630,
		y : 30 + Math.floor(Math.random() * 440),
		w: 32,
		h: 32,
		reward: type == 1 ? 10 : 20,
		img: type == 1 ? bad1Sprite : bad2Sprite,
		// for moving sprites
		movementOffset: 0,
		movement: 2,
		shoot: fps * 3,
		draw: function(){
			drawSprite(this);
		},
		move: function(){
			if(--this.shoot == 0){
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
	let horiz = hero.x - baddie.x;
	let vert = hero.y - baddie.y;
	let angle = Math.atan(vert / horiz);
	let projectile = {
			x: baddie.x + 8,
			y: baddie.y + 8,
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