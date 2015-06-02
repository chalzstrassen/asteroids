(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = function (){

  };

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var randX = Math.random() * (2 * length) - length;
    var randY = Math.sqrt(length*length - randX*randX);
    if (Math.random() > 0.5) {
     randY = -randY;
    }
    return [randX, randY];
  };

  Asteroids.Util.distance = function (pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]),2) + Math.pow(pos1[1] - pos2[1],2));
  };

  Asteroids.Util.norm = function (pos) {
    return Asteroids.Util.distance([0,0], pos);
  }

  Asteroids.Util.speed = function (vel) {
    return Asteroids.Util.norm(vel);
  }
  Asteroids.Util.unitVector = function (rad) {
    var x_unit = Math.cos(rad);
    var y_unit = Math.sin(rad);

    return [x_unit, y_unit]
  }
})();
