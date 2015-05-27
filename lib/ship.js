(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (obj) {
    Asteroids.MovingObject.call(this, {
      pos: obj.game.randomPosition(),
      game: obj.game,
      vel: [0, 0],
      radius: 5,
      color: "#000890"
    });
  };


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  Ship.prototype.relocate = function () {

    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = [this.vel[0]*3, this.vel[1]*3];
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      game: this.game
    });
    this.game.bullets.push(bullet);
  };
})();
