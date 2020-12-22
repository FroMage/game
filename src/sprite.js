
function drawSprite(sprite){
	ctx.drawImage(sprite.img, 0, 0, sprite.w, sprite.h, sprite.x, sprite.y, sprite.w, sprite.h);
}

function draw(obj){
	if(Array.isArray(obj)){
		for(let element of obj){
			element.draw();
		}
	} else {
		obj.draw();
	}
}

function move(obj){
	if(Array.isArray(obj)){
		for(let element of obj){
			element.move();
		}
	} else {
		obj.move();
	}
}

function cleanup(list){
	return list.filter(function(elem){ return elem.valid(); });
}

function handleSprites(){
	// draw
	if(!gameOver){
		draw(hero);
	}
	draw(projectiles);
	draw(baddies);
	draw(explosions);
	// move
	move(projectiles);
	move(baddies);
	move(explosions);
	// collisions
	collisions();
	// cleanup
	projectiles = cleanup(projectiles);
	baddies = cleanup(baddies);
	explosions = cleanup(explosions);
}

function collisions(){
	// projectiles
	for(let projectile of projectiles){
		if(projectile.friend){
			// detect friend projectile collisions with baddies
			for(let baddie of baddies){
				if(!baddie.dead && collision(baddie, projectile)){
					baddie.dead = true;
					projectile.dead = true;
					explode(baddie);
					// only explode single baddie
					break;
				}
			}
		}
	}
	if(!gameOver && hero.grace == 0){
		// hero
		let handled = false;
		for(let baddie of baddies){
			if(!baddie.dead && collision(baddie, hero)){
				heroTouched();
				handled = true;
				break;
			}
		}
		if(!handled){
			for(let projectile of projectiles){
				if(!projectile.friend){
					// detect hostile projectile collisions with baddies
					if(collision(hero, projectile)){
						heroTouched();
						break;
					}
				}
			}
		}
	}
}

function collision(a, b){
	// a is before on x
	if(a.x + a.w < b.x)
		return false;
	// a is after on x
	if(a.x > b.x + b.w)
		return false;
	// a is before on y
	if(a.y + a.h < b.y)
		return false;
	// a is after on y
	if(a.y > b.y + b.h)
		return false;
	// collision
	return true;
}

