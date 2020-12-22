var baddies = [];

var bad1Sprite;
const bad1Speed = 2;

function makeBaddie(){
	baddies.push({
		x : 630,
		y : 30 + Math.floor(Math.random() * 440),
		w: 32,
		h: 32,
		draw: function(){
			drawSprite(bad1Sprite, this.x, this.y);
		},
		move: function(){
			this.x -= bad1Speed;
		},
		valid: function(){
			return this.x > 0 && !this.dead;
		}
	});
}

function makeBaddies(){
	// 1% chance
	if(Math.random() < 0.01){
		makeBaddie();
	}
}