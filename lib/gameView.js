(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function () {
    document.getElementById("score").innerHTML = this.game.score;
    document.getElementById("lives").innerHTML = this.game.lives;
    document.getElementById("level").innerHTML = this.game.level;
    this.bindKeyHandlers();
    this.waitScreen();
  }

  var bckImage = new Image();

  GameView.prototype.animate = function () {
    bckImage.onload = function () {
      this.ctx.drawImage(bckImage, 0, 0);
    }.bind(this);
    bckImage.src = "BackgroundForAsteroids.png"
    Asteroids.timerId = window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx, bckImage);
      if (this.game.checkClear()) {
        this.game.advanceLevel(this.ctx);
      }
      if (this.game.hasLost()) {
        this.game.restart(this.ctx);
      }
    }).bind(this), 20)
  }

  GameView.prototype.pause = function () {
    if (Asteroids.timerId) {
      window.clearTimeout(Asteroids.timerId);
      Asteroids.timerId = null;
      this.ctx.font = "36px fantasy";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Paused, press 'p'", this.game.DIM_X/4, this.game.DIM_Y/3);
      this.ctx.font = "36px fantasy";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("to resume game", this.game.DIM_X/4, this.game.DIM_Y/3 + 50);
    } else {
      this.animate();
    }
  }

  GameView.prototype.waitScreen = function () {
    this.game.step();
    this.game.draw(this.ctx, bckImage);
    this.ctx.font = "36px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Ready? Press 'enter'", this.game.DIM_X/4, this.game.DIM_Y/3);
    this.ctx.font = "36px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("to start playing.", this.game.DIM_X/4, this.game.DIM_Y/3 + 50);
  }

  GameView.prototype.proceed = function () {
    if (!Asteroids.timerId) {
      this.animate();
    }
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('left', this.game.ship.rotate.bind(this.game.ship, -Math.PI/8));
    key('right', this.game.ship.rotate.bind(this.game.ship, Math.PI/8));
    key('up', this.game.ship.accelerate.bind(this.game.ship, -1));
    key('down', this.game.ship.accelerate.bind(this.game.ship, 1));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
    key('p', this.pause.bind(this));
    key('enter', this.proceed.bind(this));
  }
})();
