
function drawSprite(img, x, y){
	ctx.drawImage(img, 0, 0, 32, 32, x, y, 32, 32);
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

function drawSprites(){
	// draw
	draw(hero);
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
	for(let projectile of projectiles){
		// detect collisions
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

