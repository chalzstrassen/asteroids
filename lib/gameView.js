(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function () {
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20)
    this.bindKeyHandlers();
  }

  GameView.prototype.bindKeyHandlers = function () {
    key('left', this.game.ship.power.bind(this.game.ship, [-1, 0]));
    key('right', this.game.ship.power.bind(this.game.ship, [ 1, 0]));
    key('up', this.game.ship.power.bind(this.game.ship, [ 0, -1]));
    key('down', this.game.ship.power.bind(this.game.ship, [0, 1]));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
  }
})();
