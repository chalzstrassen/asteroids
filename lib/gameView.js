(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.waitScreen();
  }

  GameView.prototype.animate = function () {
    Asteroids.timerId = window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
      if (this.game.checkClear()) {
        this.game.advanceLevel(this.ctx);
      }
      if (this.game.hasLost()) {
        this.game.restart(this.ctx);
      }
      this.updateData();
    }).bind(this), 20)
  }

  GameView.prototype.updateData = function () {
    this.ctx.font = "18px impact";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: " + this.game.score, 10, this.game.DIM_Y-10);
    this.ctx.font = "18px impact";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("x "+this.game.lives, this.game.DIM_X-30, this.game.DIM_Y-10);
    this.ctx.font = "18px impact";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Level: " + this.game.level, 10, 30)
  }
  GameView.prototype.pause = function () {
    if (Asteroids.timerId) {
      window.clearTimeout(Asteroids.timerId);
      Asteroids.timerId = null;
      this.ctx.font = "36px fantasy";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Paused, press 'p'", this.game.DIM_X/3+50, this.game.DIM_Y/2);
      this.ctx.font = "36px fantasy";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("to resume game", this.game.DIM_X/3+50, this.game.DIM_Y/2 + 50);
    } else {
      this.animate();
    }
  }

  GameView.prototype.waitScreen = function () {
    this.game.step();
    this.ctx.font = "36px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Ready? Press 'enter'", this.game.DIM_X/3+50, this.game.DIM_Y/2);
    this.ctx.font = "36px fantasy";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("to start playing.", this.game.DIM_X/3+50, this.game.DIM_Y/2 + 50);
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
