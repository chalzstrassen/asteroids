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
      if (otherObject.inv == false) {
        otherObject.relocate();
      }
    } else if (otherObject instanceof Asteroid) {
      var self_X = this.vel[0];
      var self_Y = this.vel[1];
      var other_X = otherObject.vel[0];
      var other_Y = otherObject.vel[1];
      this.pos = [this.pos[0] + other_X, this.pos[1] + other_Y];
      this.vel = [other_X, other_Y];
      otherObject.pos = [otherObject.pos[0] + self_X, otherObject.pos[1] + self_Y];
      otherObject.vel = [self_X, self_Y];
    }
  };

})();
