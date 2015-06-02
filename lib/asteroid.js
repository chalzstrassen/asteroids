(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    Asteroids.MovingObject.call(this, {
      pos: obj.pos,
      game: obj.game,
      vel: Asteroids.Util.randomVec(2),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      stroke: "white"
    });
  }

  Asteroid.COLOR = "#000"
  Asteroid.RADIUS = 12;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroid) {
      var self_X = this.vel[0];
      var self_Y = this.vel[1];
      var other_X = otherObject.vel[0];
      var other_Y = otherObject.vel[1];
      this.pos = [this.pos[0] + other_X, this.pos[1] + other_Y];
      this.vel = [other_X, other_Y];
      otherObject.pos = [otherObject.pos[0] + self_X, otherObject.pos[1] + self_Y];
      otherObject.vel = [self_X, self_Y];
      // Vector component negation: reflection
      // this.pos = [this.pos[0] - this.vel[0], this.pos[1] - this.vel[1]];
      // this.vel = [-this.vel[0], -this.vel[1]];
      // otherObject.pos = [otherObject.pos[0] - otherObject.vel[0], otherObject.pos[1] - otherObject.vel[1]];
      // otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
      // Random angle upon collision: scattering
      // var selfSpeed = Asteroids.Util.speed(this.vel);
      // this.vel = [selfSpeed, selfSpeed];
      // var otherSpeed = Asteroids.Util.speed(otherObject.vel);
      // otherObject.vel = [otherSpeed * -rand_X, otherSpeed * -rand_Y];
    }
  };

})();
