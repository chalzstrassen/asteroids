(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var Reflector = Asteroids.Reflector = function (obj) {
		Asteroids.MovingObject.call(this, {
			pos: obj.pos,
			game: obj.game,
			vel: Asteroids.Util.randomVec(1),
			radius: 15,
			color: "113",
			stroke: "blue"
		});
	}
})();