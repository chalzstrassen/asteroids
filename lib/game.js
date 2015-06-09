(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (width, height) {
    this.DIM_X = width;
    this.DIM_Y = height;
    this.NUM_ASTEROIDS = 20;
    this.ship = new Asteroids.Ship({ game: this });
    this.asteroids = [];
    this.reflectors = [];
    this.scatterers = [];
    this.bullets = [];
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.addAsteroids();
    this.addReflectors();
  };

  Game.prototype.addAsteroids = function () {
    var difficultyAdder = (this.level-1)*3;  
    for (var i = 0; i < this.NUM_ASTEROIDS + difficultyAdder; i++) {
      this.asteroids.push(new Asteroids.Asteroid(
        { pos: this.randomPosition(),
          game: this
        }));
    };
  };

  Game.prototype.addReflectors = function () {
    for (var i = 0; i < this.level; i++) {
      this.reflectors.push(new Asteroids.Reflector(
        { pos: this.randomPosition(),
          game: this
        }));
    };
  };

  Game.prototype.addScatterers = function () {
    if (this.level % 2 === 0) {
      for (var i = 0; i < this.level/2; i++) {
        this.scatterers.push(new Asteroids.Scatterer(
          { pos: this.randomPosition(),
            game: this
          }));
      }
    }
  }

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  };
  Game.prototype.centerPosition = function () {
    return [this.DIM_X/2, this.DIM_Y/2]
  };
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
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
        if (i == j || this.allObjects()[i] === undefined || this.allObjects()[j] === undefined) {
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
    return this.asteroids.concat([this.ship])
                         .concat(this.bullets)
                         .concat(this.reflectors)
                         .concat(this.scatterers);
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
  Game.prototype.restart = function (ctx) {
    window.clearTimeout(Asteroids.timerId);
    Asteroids.timerId = null;
    ctx.font = "36px fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("Reached lvl. " + this.level + ". You lose, press 'enter'", this.DIM_X/3, this.DIM_Y/2);
    ctx.font = "36px fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("to try again. Score: " + this.score, this.DIM_X/3, this.DIM_Y/2 + 50);
    this.asteroids = [];
    this.bullets = [];
    this.scatterers = [];
    this.reflectors = [];
    this.score=0;
    this.lives=3;
    this.level=1;
    this.addAsteroids();
  }

  Game.prototype.checkClear = function () {
    return this.asteroids.length === 0;    
  }
  Game.prototype.hasLost = function () {
    return this.lives === 0;
  }
  Game.prototype.advanceLevel = function (ctx) {
    this.level++;
    this.asteroids = [];
    this.bullets = [];
    this.reflectors = [];
    this.scatterers = [];
    this.lives++;
    this.addAsteroids();
    this.addReflectors();
    this.addScatterers();
    window.clearTimeout(Asteroids.timerId);
    Asteroids.timerId = null;
    ctx.font = "36px fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("Prepare for level " + this.level, this.DIM_X/3+50, this.DIM_Y/2);
    ctx.font = "36px fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("Press 'enter' to continue", this.DIM_X/3+50, this.DIM_Y/2+50);
  }

})();
