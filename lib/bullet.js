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
      color: "#556899",
      stroke: "red"
    });
    this.struck = false;
	};
	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Asteroid) {
			this.game.score += 10;
			this.game.remove(otherObject);
			this.game.remove(this);
			document.getElementById("score").innerHTML = this.game.score;
		} else if (otherObject instanceof Asteroids.Ship && this.struck) {
			otherObject.relocate();
		}
	};
	Bullet.prototype.isWrappable = false;

})();