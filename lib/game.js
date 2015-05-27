(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = 'cat1.jpeg';
  var Game = Asteroids.Game = function () {
    this.DIM_X = 600;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 40;
    this.ship = new Asteroids.Ship({ game: this });
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
  };


  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(
        { pos: this.randomPosition(),
          game: this
        }));
    };
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_Y, Math.random() * this.DIM_X];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(img, 0, 0);
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    };
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    };
  };

  Game.prototype.wrap = function (pos) {
    return [(pos[0] + this.DIM_X) % this.DIM_X, (pos[1] + this.DIM_Y) % this.DIM_Y]
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = 0; j < this.allObjects().length; j++) {
        if (i == j) {
          continue;
        };
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        };
      };
    };
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var asteroidIdx = this.asteroids.indexOf(obj);
      if (asteroidIdx > -1) {
        this.asteroids.splice(asteroidIdx, 1);
      }
    } else if (obj instanceof Asteroids.Bullet) {
      var bulletIdx = this.bullets.indexOf(obj);
      if (bulletIdx > -1) {
        this.bullets.splice(bulletIdx, 1);
      }
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  }
  Game.prototype.allObjects = function() {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  }

  Game.prototype.isOutOfBounds = function (pos) {
    if (pos[0] < 0 || pos[0] > this.DIM_X) {
      return true;
    } else if (pos[1] < 0 || pos[1] > this.DIM_Y) {
      return true;
    } else {
      return false;
    }
  }
})();
