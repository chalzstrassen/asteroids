(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var Reflector = Asteroids.Reflector = function (obj) {
		Asteroids.MovingObject.call(this, {
			pos: obj.pos,
			game: obj.game,
			vel: Asteroids.Util.randomVec(1),
			radius: 15,
			color: "#113",
			stroke: "blue"
		});
	};


	Asteroids.Util.inherits(Reflector, Asteroids.MovingObject);

	Reflector.prototype.collideWith = function (otherObject) {
		if (otherObject instanceof Asteroids.Ship) {
	      otherObject.relocate();
	  } else if (otherObject instanceof Asteroids.Asteroid) {
	      var self_X = this.vel[0];
	      var self_Y = this.vel[1];
	      var other_X = otherObject.vel[0];
	      var other_Y = otherObject.vel[1];
	      this.pos = [this.pos[0] + other_X, this.pos[1] + other_Y];
	      this.vel = [other_X, other_Y];
	      otherObject.pos = [otherObject.pos[0] + self_X, otherObject.pos[1] + self_Y];
	      otherObject.vel = [self_X, self_Y];
	  } else if (otherObject instanceof Asteroids.Bullet) {
        otherObject.pos = [otherObject.pos[0] - otherObject.vel[0], otherObject.pos[1] - otherObject.vel[1]];
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
        otherObject.stroke = "#020299";
        otherObject.struck = true;
	  }
	};
})();