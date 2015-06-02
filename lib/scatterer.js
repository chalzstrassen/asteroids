(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var Scatterer = Asteroids.Scatterer = function (obj) {
		Asteroids.MovingObject.call(this, {
			pos: obj.pos,
			game: obj.game,
			vel: Asteroids.Util.randomVec(1),
			radius: 17,
			color: "#910793",
			stroke: "purple"
		});
	};


	Asteroids.Util.inherits(Scatterer, Asteroids.MovingObject);

	Scatterer.prototype.collideWith = function (otherObject) {
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
        var otherSpeed = Asteroids.Util.speed(otherObject.vel);
        var randAngle = Math.random() * 6.284;
        rand_x = Math.cos(randAngle);
        rand_y = Math.sin(randAngle);
      	otherObject.vel = [otherSpeed * rand_x, otherSpeed * rand_y];
        otherObject.stroke = "#920299";
        otherObject.struck = true;
	  }
	};
})();