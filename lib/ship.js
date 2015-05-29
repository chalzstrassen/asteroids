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
    this.rad = Math.PI/2;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  Ship.prototype.draw = function (ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI,
        false
      );
    ctx.fill();
    ctx.translate(x,y);
    ctx.rotate(this.rad - Math.PI/2);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-5, 10);
    ctx.lineTo(5, 10);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "#847890"
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  Ship.prototype.relocate = function () {
    this.game.lives--;
    if (this.game.lives == 0) {
      this.game.restart();
    }
    document.getElementById("lives").innerHTML = this.game.lives;
    document.getElementById("score").innerHTML = this.game.score;
    this.pos = this.game.randomPosition();
    //this.pos = this.game.centerPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.accelerate = function (accel) {
    var vector = Asteroids.Util.unitVector(this.rad);
    var newVel = [this.vel[0] + vector[0]*accel, this.vel[1] + vector[1]*accel];
    if (Asteroids.Util.speed(newVel) < 5) {
      this.vel = newVel;
    }
  };
  Ship.prototype.rotate = function (turn) {
    this.rad = this.rad + turn;
  };

  Ship.prototype.fireBullet = function () {
    var bulletAngle = this.rad - Math.PI;
    var bulletVel = Asteroids.Util.unitVector(bulletAngle);
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: [bulletVel[0]*5, bulletVel[1]*5],
      game: this.game
    });
    this.game.add(bullet);
  };

})();
