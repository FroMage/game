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
		draw: function(){
			drawSprite(this);
		},
		move: function(){
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