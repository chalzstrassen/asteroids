(function () {
	if (typeof Asteroids === "undefined") {
    	window.Asteroids = {};
  	}
	var Bullet = Asteroids.Bullet = function (obj) {
	Asteroids.MovingObject.call(this, {
	  pos: obj.pos,
	  game: obj.game,
	  vel: obj.vel,
      radius: 2,
      color: "#556899"
    });
	}
	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.remove(otherObject);
			this.game.remove(this);
		}
	}

})();