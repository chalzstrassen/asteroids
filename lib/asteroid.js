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
      color: Asteroid.COLOR
    });
  }

  Asteroid.COLOR = "#29A320"
  Asteroid.RADIUS = 12;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroid) {
      debugger
      this.vel = [this.vel[0] * -1, this.vel[1] * -1];
      otherObject.vel = [otherObject.vel[0] * -1, otherObject.vel[1] * -1]
    }
  };

})();
