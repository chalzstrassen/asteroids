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
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20)
    this.bindKeyHandlers();
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('left', this.game.ship.rotate.bind(this.game.ship, -Math.PI/8));
    key('right', this.game.ship.rotate.bind(this.game.ship, Math.PI/8));
    key('up', this.game.ship.accelerate.bind(this.game.ship, -1));
    key('down', this.game.ship.accelerate.bind(this.game.ship, 1));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  }
})();
