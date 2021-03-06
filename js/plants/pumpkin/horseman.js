//Example Mob

Horseman.prototype = Object.create(Mob.prototype);
Horseman.prototype.key = 'horseman';
Horseman.prototype.constructor = Horseman;
Horseman.prototype.moveSpeed = 300;
Horseman.prototype.attackRange = 100;
Horseman.prototype.sightRange = 200;
Horseman.prototype.health = 10;
Horseman.prototype.attackSpeed = 2;
Horseman.prototype.projectile = JackOLantern;
Horseman.prototype.tag = 'horseman';
Horseman.prototype.charge = false;


//x and y are world coordinates, not grid positions
function Horseman(game, x, y){
	Phaser.Sprite.call(this, game, x, y, this.key)
	this.anchor.set(0.5, 0.5);
	this.scale.set(1, 1);
	game.physics.arcade.enable(this);
	game.add.existing(this);
	game.sound.play('whinny');
}

Horseman.prototype.moveTowardPlayer = function() {
	if (this.charge != true){
		this.charge = true;
		this.rotation = this.angleToPlayer;
		this.body.velocity.x = this.moveSpeed*Math.cos(this.angleToPlayer);
		this.body.velocity.y = this.moveSpeed*Math.sin(this.angleToPlayer);
		game.sound.play('hooves');
	}
}

Horseman.prototype.idleMove = function() {
	this.charge = false;
	this.angle += 1;
	this.body.velocity.x = this.moveSpeed/2*Math.cos(this.rotation);
	this.body.velocity.y = this.moveSpeed/2*Math.sin(this.rotation);
}

Horseman.prototype.attack = function() {
	projectiles.add(new this.projectile(this.game, this.x, this.y, this.angleToPlayer));
}

Horseman.prototype.end = function(){
	drop = new Item(game, this.body.x, this.body.y, 'pumpkin', false, 9, 11);
	this.destroy();
}