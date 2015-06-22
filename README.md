# [Jose's Escapism](http://chalzstrassen.github.io/asteroids)

## How to play

1. 'space' bar: fire projectile.
2. 'right' arrow key: rotate ship clockwise.
3. 'left' arrow key: rotate ship counter-clockwise.
4. Blue asteroids reflect projectiles. Reflected projectiles will destroy ship.
5. Magenta asteroids scatter projectile in a random direction. Scattered projectiles will destroy ship.

## Languages

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) 
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Plugins (*No [jQuery](https://jquery.com/)!!!* :grinning:)

- [Keymaster.js](https://github.com/madrobby/keymaster)

## Technical Implementation

- Projectile behavior after hitting Blue/Magenta asteroids.
- After dying, the ship becomes white, which is when it is immune to collision. This should fix the issue in which during relocation, the ship may relocate to a position where collision with an asteroid can happen and cause the player to lose two lives in one death.
